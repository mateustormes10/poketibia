import { TileActions } from "./TileActions.js";

export default class Renderer {
	constructor(ctx, canvas, game = null, viewCols = 20, viewRows = 20) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.game = game;
		this.viewCols = viewCols;
		this.viewRows = viewRows;

		// tamanho base das sprites reais (32x32)
		this.baseTile = 32;
		this.tileSizeRender = this.baseTile;  // fallback

		// offsets (in tiles) dentro do chunk que estamos desenhando
		this.xOffset = 0;
		this.yOffset = 0;

		// arrays para largura/altura por coluna/linha e seus offsets
		this.colWidths = new Array(this.viewCols).fill(0);
		this.rowHeights = new Array(this.viewRows).fill(0);
		this.colOffsets = new Array(this.viewCols).fill(0);
		this.rowOffsets = new Array(this.viewRows).fill(0);

		// pending overlays serão desenhados depois dos players
		this._pendingOverlays = [];
		this._lastLoadedImages = null;

		// desativa smoothing para evitar "seams" entre tiles ao escalar
		try {
			this.ctx.imageSmoothingEnabled = false;
			if (this.ctx.msImageSmoothingEnabled !== undefined) this.ctx.msImageSmoothingEnabled = false;
		} catch (e) {}
	}

	// calcula arrays inteiros de largura/altura que somam exatamente ao canvas
	_calcTileArrays() {
		const totalCols = this.viewCols;
		const totalRows = this.viewRows;

		// base integer widths/heights
		const baseW = Math.floor(this.canvas.width / Math.max(1, totalCols));
		const baseH = Math.floor(this.canvas.height / Math.max(1, totalRows));

		// pixels sobram que precisamos distribuir
		let extraW = this.canvas.width - baseW * totalCols;
		let extraH = this.canvas.height - baseH * totalRows;

		// preenche colWidths e rowHeights distribuindo 1px extras na esquerda/top
		for (let c = 0; c < totalCols; c++) {
			this.colWidths[c] = baseW + (extraW > 0 ? 1 : 0);
			if (extraW > 0) extraW--;
		}
		for (let r = 0; r < totalRows; r++) {
			this.rowHeights[r] = baseH + (extraH > 0 ? 1 : 0);
			if (extraH > 0) extraH--;
		}

		// calc prefix offsets
		let acc = 0;
		for (let c = 0; c < totalCols; c++) {
			this.colOffsets[c] = acc;
			acc += this.colWidths[c];
		}
		acc = 0;
		for (let r = 0; r < totalRows; r++) {
			this.rowOffsets[r] = acc;
			acc += this.rowHeights[r];
		}
	}

	renderMap(mapNearby, loadedImages, imagesPreloaded) {
		if (!mapNearby || !mapNearby.length || !imagesPreloaded) return;

		// guarda referência para usar ao desenhar overlays depois
		this._lastLoadedImages = loadedImages;
		this._pendingOverlays.length = 0;

		// recalcula arrays de tile para preencher todo o canvas
		this._calcTileArrays();

		// determina quantos tiles vamos desenhar (capados pela chunk)
		const colsToRender = Math.min(this.viewCols, (mapNearby[0]?.length) || 0);
		const rowsToRender = Math.min(this.viewRows, mapNearby.length);

		// centraliza viewport dentro do chunk (em tiles)
		const chunkCols = (mapNearby[0]?.length) || 0;
		const chunkRows = mapNearby.length;
		this.xOffset = Math.max(0, Math.floor((chunkCols - colsToRender) / 2));
		this.yOffset = Math.max(0, Math.floor((chunkRows - rowsToRender) / 2));

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.imageSmoothingEnabled = false; // reforça antes do desenho

		// desenha apenas a viewport 20x20 (ou menor se chunk for menor)
		for (let vy = 0; vy < rowsToRender; vy++) {
			for (let vx = 0; vx < colsToRender; vx++) {
				const mx = this.xOffset + vx;
				const my = this.yOffset + vy;
				const tileStr = (mapNearby[my] && mapNearby[my][mx]) || "";
				const tileParts = String(tileStr).replace(/\[|\]/g, "").split(",");
				const passable = tileParts[tileParts.length - 1] === "S";
				const pngs = tileParts.slice(0, -1).filter(p => /^\d+$/.test(p));

				// usa arrays de larguras/alturas e offsets inteiros
				const sx = Math.round(this.colOffsets[vx]);
				const sy = Math.round(this.rowOffsets[vy]);
				const sw = this.colWidths[vx];
				const sh = this.rowHeights[vy];

				for (const png of pngs) {
					const idKey = String(png);
					const action = TileActions[idKey];
					const isOverlay = action && action.layer === "overlay";
					// se for overlay, acumula para desenhar depois dos players
					if (isOverlay) {
						// calcula coordenada global do tile (mx/my são índices dentro do chunk)
						const globalX = mx + (this.game?.mapOrigin?.x ?? 0);
						const globalY = my + (this.game?.mapOrigin?.y ?? 0);
						this._pendingOverlays.push({ id: idKey, sx, sy, sw, sh, globalX, globalY });
						continue;
					}
					const img = loadedImages[png];
					if (img && img.complete && img.naturalWidth > 0) {
						this.ctx.drawImage(img, sx, sy, sw, sh);
					} else {
						this.ctx.fillStyle = "#444";
						this.ctx.fillRect(sx, sy, sw, sh);
					}
				}

				// removed red debug overlay for non-passable tiles to avoid red blur
				if (!passable) {
					// debug overlay removed — keep empty so non-passable tiles don't show red blur
					// If you need debug, uncomment:
					// this.ctx.fillStyle = "rgba(255,0,0,0.12)";
					// this.ctx.fillRect(sx, sy, sw, sh);
				}
			}
		}
	}

	// desenha overlays acumulados (deve ser chamado APÓS desenhar players)
	renderOverlays() {
		if (!this._lastLoadedImages || !this._pendingOverlays.length) return;
		for (const op of this._pendingOverlays) {
			try {
				const action = TileActions[String(op.id)];
				let drawKey = String(op.id);

				// se existir idleAnimation e o jogador estiver perto o suficiente, seleciona frame atual
				if (action?.idleAnimation && this.game?.player) {
					try {
						const range = Number(action.idleAnimation.range ?? Infinity);
						const px = Number(this.game.player.position.x ?? 0);
						const py = Number(this.game.player.position.y ?? 0);
						const gx = Number(op.globalX ?? 0);
						const gy = Number(op.globalY ?? 0);
						const dist = Math.abs(px - gx) + Math.abs(py - gy);
						if (dist <= range) {
							const frames = Array.isArray(action.idleAnimation.frames) ? action.idleAnimation.frames : [];
							const interval = Number(action.idleAnimation.interval ?? 600);
							if (frames.length) {
								const totalMs = frames.length * interval;
								const t = Date.now() % totalMs;
								const idx = Math.floor(t / interval) % frames.length;
								drawKey = String(frames[idx]);
							}
						}
					} catch (e) { /* fallback: usa op.id */ }
				}

				const img = this._lastLoadedImages[drawKey] || this._lastLoadedImages[op.id];
				if (img && img.complete && img.naturalWidth > 0) {
					this.ctx.drawImage(img, Math.round(op.sx), Math.round(op.sy), op.sw, op.sh);
				} else {
					this.ctx.fillStyle = "#444";
					this.ctx.fillRect(Math.round(op.sx), Math.round(op.sy), op.sw, op.sh);
				}
			} catch (e) { /* ignore per-tile errors */ }
		}
		this._pendingOverlays.length = 0;
	}

	drawPlayer(playerEntity, mapOrigin, color = "blue") {
		if (!playerEntity) return;
		if (!Number.isFinite(playerEntity.position.x) || !Number.isFinite(playerEntity.position.y)) return;



		// efeito de captura falhada (pisca)
		if (playerEntity._captureFailFlash !== undefined) {
			playerEntity._captureFailFlash -= 0.016; // ~60fps
			if (playerEntity._captureFailFlash <= 0) {
				delete playerEntity._captureFailFlash;
				return; // pula desenho
			}
			if (playerEntity._captureFailFlash % 0.1 < 0.05) return; // pisca a cada 100ms
		}

		// converte coordenada global -> índice local do chunk, depois aplica offset da viewport
		const localX = playerEntity.position.x - (mapOrigin?.x ?? 0);
		const localY = playerEntity.position.y - (mapOrigin?.y ?? 0);

		// índices dentro da viewport
		const idxX = Math.round(localX - this.xOffset);
		const idxY = Math.round(localY - this.yOffset);



		// fora da viewport
		if (idxX < 0 || idxX >= this.viewCols || idxY < 0 || idxY >= this.viewRows) return;

		// calcula posição em pixels usando offsets prefixados
		const px = Math.round(this.colOffsets[idxX]);
		const py = Math.round(this.rowOffsets[idxY]);
		let pw = this.colWidths[idxX];
		let ph = this.rowHeights[idxY];

		// Para pokémons, força tamanho mínimo de 64x64 para garantir visibilidade
		if (playerEntity.ownerId) {
			const minSize = 64;
			if (pw < minSize) pw = minSize;
			if (ph < minSize) ph = minSize;
		}

		// se estiver totalmente fora da tela, ignora
		if (px + pw < 0 || py + ph < 0 || px > this.canvas.width || py > this.canvas.height) {
			return;
		}

		// desenha nome e barra de vida (se houver)
		try {
			const name = playerEntity.name;
			const hp = Number(playerEntity.hp ?? NaN);
			const maxHp = Number(playerEntity.maxHp ?? NaN);

			// health bar (logo acima do sprite, com mesma largura do sprite)
			if (!Number.isNaN(hp) && !Number.isNaN(maxHp)) {
				const barW = pw; // largura igual à sprite
			const barH = Math.max(6, Math.floor(pw * 0.1)); // aumentada para melhor visibilidade
			const bx = px;
			const by = py - barH - 4; // 4px de espaço entre barra e sprite

			// fundo preto (parte vazia)
			this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
			this.ctx.fillRect(bx, by, barW, barH);

			// cor da vida baseada na porcentagem
			const pct = Math.max(0, Math.min(1, hp / (maxHp || 1)));
			let hpColor = "red";
			if (pct > 0.5) hpColor = "#00ff00"; // verde
			else if (pct > 0.25) hpColor = "#ffaa00"; // laranja
			
			this.ctx.fillStyle = hpColor;
			this.ctx.fillRect(bx + 1, by + 1, Math.max(0, Math.floor((barW - 2) * pct)), Math.max(1, barH - 2));
			
			// Texto HP para Pokemon selvagens (sem ownerId)
			if (!playerEntity.ownerId && barW > 40) {
				this.ctx.font = `${Math.max(8, Math.floor(barH * 0.8))}px Arial`;
				this.ctx.textAlign = "center";
				this.ctx.textBaseline = "middle";
				this.ctx.fillStyle = "white";
				this.ctx.strokeStyle = "black";
				this.ctx.lineWidth = 2;
				const hpText = `${Math.max(0, Math.floor(hp))}/${maxHp}`;
				this.ctx.strokeText(hpText, bx + barW/2, by + barH/2);
				this.ctx.fillText(hpText, bx + barW/2, by + barH/2);
			}
		}

		// nome (acima da barra)
		if (name) {
			const textX = px + pw / 2;
			const barH = Math.max(4, Math.floor(pw * 0.08));
			const textY = (!Number.isNaN(hp) && !Number.isNaN(maxHp)) ? (py - barH - 8) : (py - 8);

			this.ctx.font = `${Math.max(12, Math.floor(pw * 0.18))}px Arial`;
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "bottom";

			// contorno preto
			this.ctx.lineWidth = 3;
			this.ctx.strokeStyle = "black";
			this.ctx.strokeText(name, textX, textY);
			// texto branco
			this.ctx.fillStyle = "white";
			this.ctx.fillText(name, textX, textY);
		}
	} catch (e) {
		// ignore erros de desenho de overlay
	}

	// tenta desenhar as 3 partes (left, top, center) com sombra sutil
	try {
		const parts = playerEntity.getCurrentSpriteParts?.() || [];
		const [centerId, leftId, topId] = parts;

		let drewSomething = false;

		// LEFT (à esquerda do centro)
		if (leftId !== null && leftId !== undefined && leftId !== 0) {
			const imgL = this.game?.loadedImages?.[String(leftId)];
			if (imgL && imgL.complete && imgL.naturalWidth > 0) {
				this.ctx.drawImage(imgL, px - pw, py, pw, ph);
			}
		}

		// TOP (acima do centro)
		if (topId !== null && topId !== undefined && topId !== 0) {
			const imgT = this.game?.loadedImages?.[String(topId)];
			if (imgT && imgT.complete && imgT.naturalWidth > 0) {
				this.ctx.drawImage(imgT, px, py - ph, pw, ph);
			}
		}

		// CENTER (por último para sobrepor)
		if (centerId !== null && centerId !== undefined && centerId !== 0) {
			const imgC = this.game?.loadedImages?.[String(centerId)];
			if (imgC && imgC.complete && imgC.naturalWidth > 0) {
				this.ctx.save();
				this.ctx.imageSmoothingEnabled = false;
				this.ctx.drawImage(imgC, px, py, pw, ph);
				this.ctx.restore();
				drewSomething = true;
			}
		}

		if (drewSomething) return;
	} catch (e) {
		// ignore e fallback
	}

	// fallback: tentar desenhar a primeira sprite conhecida (centerId ou spriteFrames[0])
	try {
		let fallbackId = null;
		// tenta centerId (se veio via getCurrentSpriteParts)
		const partsFallback = playerEntity.getCurrentSpriteParts?.() || [];
		if (partsFallback && partsFallback[0]) fallbackId = partsFallback[0];
		// se não, tenta usar spriteFrames (linha atual)
		if (!fallbackId && Array.isArray(playerEntity.spriteFrames) && playerEntity.spriteFrames.length) {
			fallbackId = Number(playerEntity.spriteFrames[0]) || null;
		}
		if (fallbackId) {
			const imgF = this.game?.loadedImages?.[String(fallbackId)];
			if (imgF && imgF.complete && imgF.naturalWidth > 0) {
				this.ctx.save();
				this.ctx.imageSmoothingEnabled = false;
				this.ctx.drawImage(imgF, px, py, pw, ph);
				this.ctx.restore();
				return;
			}
		}
		// se não houver imagem válida, não desenha fallback colorido
	} catch (e) {
		// silent
	}
}

	// Converte coordenadas de tela para coordenadas de tile
	screenToTile(screenX, screenY) {
		// Procura qual tile corresponde à posição clicada
		for (let idxX = 0; idxX < this.viewCols; idxX++) {
			for (let idxY = 0; idxY < this.viewRows; idxY++) {
				const px = Math.round(this.colOffsets[idxX]);
				const py = Math.round(this.rowOffsets[idxY]);
				const pw = this.colWidths[idxX];
				const ph = this.rowHeights[idxY];
				
				if (screenX >= px && screenX <= px + pw && screenY >= py && screenY <= py + ph) {
					return {
						x: idxX + this.xOffset,
						y: idxY + this.yOffset
					};
				}
			}
		}
		return null;
	}

	// Converte coordenadas de tile para coordenadas de tela
	tileToScreen(tileX, tileY) {
		// Converte tile global para índice local na viewport
		const idxX = tileX - this.xOffset;
		const idxY = tileY - this.yOffset;
		
		// Verifica se está dentro da viewport
		if (idxX < 0 || idxX >= this.viewCols || idxY < 0 || idxY >= this.viewRows) {
			return null;
		}
		
		return {
			x: Math.round(this.colOffsets[idxX]),
			y: Math.round(this.rowOffsets[idxY])
		};
	}
}