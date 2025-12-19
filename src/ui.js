import { SpritePlayerList } from "./SpritePlayerList.js";

export default class UI {
	constructor(game) {
		this.game = game;
		this.canvas = game.canvas;
		this.ctx = game.ctx;

		// left panel slots (1..6)
		this.slotRect = { x: 10, y: 20, w: 120, h: 56, gap: 12, radius: 10 };
		this.maxSlots = 6;

		// sprite selector data
		this.spriteTypes = Object.keys(SpritePlayerList || {});
		if (!this.spriteTypes.length) this.spriteTypes = ["default"];
		this.spriteIndex = 0;
		this.spriteDirection = "down";

		this.menuOpen = false; // ESC menu
		this.spriteMenuOpen = false; // C menu

		// cached buttons
		this._closeBtn = null;
		this._queuedSpawns = [];
		this._previewCache = {}; // evita reload repetido
		this._activePokemonSlot = -1; // Rastreia qual slot está ativo (-1 = nenhum)
	}

	// toggle sprite menu (garante preload do preview)
	toggleSpriteMenu() {
		this.spriteMenuOpen = !this.spriteMenuOpen;
		if (this.spriteMenuOpen) {
			this.menuOpen = false;
			// Fecha a UI do chat (mas não o chat completamente, só a visibilidade do input)
			if (this.game.chatUI && this.game.chatUI.inputActive) {
				this.game.chatUI.inputActive = false;
				this.game.chatUI.inputText = "";
			}
			const type = this.spriteTypes[this.spriteIndex] || "default";
			this.preloadSpritePreview(type, this.spriteDirection);
			// Força renderização para mostrar preview imediatamente
			setTimeout(() => this.game.renderMapImmediate(), 50);
		}
	}

	preloadSpritePreview(type, direction = "down") {
		try {
			// Precarrega TODAS as partes da sprite (center, left, top) da primeira row
			const rows = SpritePlayerList[type]?.[direction] || SpritePlayerList[type]?.down || [];
			if (!rows.length) return;
			
			const firstRow = rows[0];
			if (!Array.isArray(firstRow)) return;
			
			// Coleta todos os IDs da primeira row (center, left, top)
			const spriteIds = firstRow.filter(v => Number.isFinite(v) && v > 0);
			if (!spriteIds.length) return;
			
			// Precarrega cada parte
			spriteIds.forEach(id => {
				const key = String(id);
				if (this.game.loadedImages[key] || this._previewCache[key]) return;
				
				const img = new Image();
				img.onload = () => { 
					this.game.loadedImages[key] = img; 
					this._previewCache[key] = true;
				};
				img.onerror = () => { 
					this._previewCache[key] = true;
				};
				img.src = `./assets/sprites/${id}.png`;
				this._previewCache[key] = false;
			});
		} catch (e) {
			console.warn("Erro ao precarregar sprite preview:", e);
		}
	}

	// envia spawns enfileirados se houver conexão
	flushQueuedSpawns() {
		if (!this._queuedSpawns.length) return;
		if (!this.game.ws || this.game.ws.readyState !== WebSocket.OPEN) return;
		for (const payload of this._queuedSpawns) {
			try { this.game.ws.send(JSON.stringify(payload)); } catch (e) {}
		}
		this._queuedSpawns = [];
	}

	draw() {
		try {
			this.drawLeftPanel();
			if (this.menuOpen) this.drawCenterMenu();
			if (this.spriteMenuOpen) this.drawSpriteMenu();
		} catch (e) {}
	}

	drawLeftPanel() {
		const ctx = this.ctx;
		const { x, y, w, h, gap, radius } = this.slotRect;
		const pokes = (this.game.player?.pokemons) ? this.game.player.pokemons.slice(0, this.maxSlots) : [];
		ctx.save();
		for (let i = 0; i < this.maxSlots; i++) {
			const sx = x;
			const sy = y + i * (h + gap);
			// bg rounded
			ctx.beginPath();
			this.roundRectPath(ctx, sx, sy, w, h, radius);
			
			// Se este slot está ativo, usa cor diferente
			if (this._activePokemonSlot === i) {
				ctx.fillStyle = "rgba(70,140,70,0.8)"; // Verde para indicar ativo
			} else {
				ctx.fillStyle = "rgba(40,40,40,0.6)";
			}
			ctx.fill();
			
			// Borda mais destacada para slot ativo
			ctx.lineWidth = this._activePokemonSlot === i ? 2 : 1;
			ctx.strokeStyle = this._activePokemonSlot === i ? "rgba(100,255,100,0.8)" : "rgba(255,255,255,0.08)";
			ctx.stroke();

			const p = pokes[i];
			if (p) {
				// assegura preload da sprite do slot (se ainda não carregada)
				try {
					let spriteId = p.sprite || p.sprite_down || p.sprite_up || 0;
					if (typeof spriteId === "string") {
						const m = String(spriteId).match(/\d+/);
						if (m) spriteId = Number(m[0]);
					}
					if (spriteId && !this.game.loadedImages[String(spriteId)]) {
						const img = new Image();
						img.onload = () => { try { this.game.loadedImages[String(spriteId)] = img; this.game.renderMapImmediate(); } catch(e){} };
						img.onerror = () => { this.game.loadedImages[String(spriteId)] = img; };
						img.src = `./assets/sprites/${String(spriteId)}.png`;
					}
				} catch(e){}
				// name
				ctx.fillStyle = "white";
				ctx.font = "13px Arial";
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				let name = String(p.name || "Pokemon");
				const maxW = w - 48;
				while (ctx.measureText(name).width > maxW && name.length > 3) name = name.slice(0, -1);
				if (ctx.measureText(name).width > maxW) name = name.slice(0, Math.max(0, name.length - 3)) + "...";
				ctx.fillText(name, sx + 8, sy + 6);

				// element
				ctx.fillStyle = "rgba(255,255,255,0.85)";
				ctx.font = "11px Arial";
				ctx.fillText(String(p.element || "??"), sx + 8, sy + 26);

				// sprite preview (right)
				let spriteId = null;
				if (p.sprite && String(p.sprite).match(/\d+/)) spriteId = String(p.sprite).match(/\d+/)[0];
				else if (p.sprite_down && String(p.sprite_down).match(/\d+/)) spriteId = String(p.sprite_down).match(/\d+/)[0];
				const imgX = sx + w - 40;
				const imgY = sy + 8;
				if (spriteId) {
					const img = this.game.loadedImages[String(spriteId)];
					if (img && img.complete && img.naturalWidth > 0) ctx.drawImage(img, imgX, imgY, 32, 32);
					else { ctx.fillStyle = "rgba(255,255,255,0.06)"; ctx.fillRect(imgX, imgY, 32, 32); }
				} else {
					ctx.fillStyle = "rgba(255,255,255,0.06)";
					ctx.fillRect(imgX, imgY, 32, 32);
				}
			} else {
				// empty
				ctx.fillStyle = "rgba(255,255,255,0.35)";
				ctx.font = "12px Arial";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.fillText("(empty)", sx + w / 2, sy + h / 2);
			}
		}
		ctx.restore();
	}

	roundRectPath(ctx, x, y, w, h, r) {
		const radius = Math.min(r, w / 2, h / 2);
		ctx.moveTo(x + radius, y);
		ctx.arcTo(x + w, y, x + w, y + h, radius);
		ctx.arcTo(x + w, y + h, x, y + h, radius);
		ctx.arcTo(x, y + h, x, y, radius);
		ctx.arcTo(x, y, x + w, y, radius);
		ctx.closePath();
	}

	// click handling (slots)
	handleClick(clientX, clientY) {
		const { x, y, w, h, gap } = this.slotRect;
		for (let i = 0; i < this.maxSlots; i++) {
			const sx = x;
			const sy = y + i * (h + gap);
			if (clientX >= sx && clientX <= sx + w && clientY >= sy && clientY <= sy + h) {
				this.onSlotClick(i);
				return true;
			}
		}
		return false;
	}

	onSlotClick(index) {
		// tenta várias fontes (player.pokemons, player.activePokemons, characterData.activePokemons)
		const pokes = this.game.player?.pokemons || this.game.player?.activePokemons || this.game.characterData?.activePokemons || [];
		const p = pokes[index];
		if (!p) { console.warn("No pokemon in slot", index); return; }
		
		// Se clicou no mesmo slot que já está ativo, recolhe o pokemon
		if (this._activePokemonSlot === index) {
			this.recallPokemon();
			this._activePokemonSlot = -1;
			return;
		}
		
		// Marca este slot como ativo
		this._activePokemonSlot = index;
		
		// normaliza sprite pra número se vier como "[12345]" ou string com dígitos
		let spriteVal = p.sprite || p.sprite_down || p.sprite_up || 0;
		if (typeof spriteVal === "string") {
			const m = String(spriteVal).match(/\d+/);
			if (m) spriteVal = Number(m[0]);
		}
		
		const payload = {
			action: "spawnPokemon",
			playerId: this.game.characterData.id,
			payload: {
				pokemon: {
					name: p.name || "Wild",
					sprite: spriteVal,
					element: p.element || "normal"
				}
			}
		};
		
		// envia se ws aberto, senão enfileira para enviar depois
		if (this.game.ws && this.game.ws.readyState === WebSocket.OPEN) {
			try { 
				this.game.ws.send(JSON.stringify(payload));
			} catch (e) { 
				console.warn("❌ Falha ao enviar spawn:", e); 
				this._queuedSpawns.push(payload); 
			}
		} else {
			this._queuedSpawns.push(payload);
		}
	}
	
	// Recolhe o pokemon ativo
	recallPokemon() {
		// Remove pokemon do cliente
		const myId = this.game.characterData?.id || this.game.player?.id;
		if (!myId) return;
		
		const index = this.game.wildEntities.findIndex(w => 
			w.ownerId && String(w.ownerId) === String(myId)
		);
		
		if (index !== -1) {
			this.game.wildEntities.splice(index, 1);
			this.game.renderMapImmediate();
		}
		
		// Envia comando para servidor remover
		if (this.game.ws && this.game.ws.readyState === WebSocket.OPEN) {
			try {
				this.game.ws.send(JSON.stringify({
					action: "recallPokemon",
					playerId: myId
				}));
			} catch (e) {
				console.warn("❌ Falha ao enviar recall:", e);
			}
		}
	}

	// center ESC menu
	drawCenterMenu() {
		const cx = this.canvas.width / 2;
		const cy = this.canvas.height / 2;
		const w = 320, h = 160;
		const ctx = this.ctx;
		ctx.save();
		ctx.fillStyle = "rgba(20,20,20,0.95)";
		ctx.fillRect(cx - w/2, cy - h/2, w, h);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 1;
		ctx.strokeRect(cx - w/2, cy - h/2, w, h);

		ctx.fillStyle = "white";
		ctx.font = "18px Arial";
		ctx.textAlign = "center";
		ctx.fillText("Menu", cx, cy - h/2 + 28);

		const btnW = 220, btnH = 40;
		this._closeBtn = { x: cx - btnW/2, y: cy - 10, w: btnW, h: btnH };
		ctx.fillStyle = "rgba(255,255,255,0.06)";
		ctx.fillRect(this._closeBtn.x, this._closeBtn.y, btnW, btnH);
		ctx.strokeStyle = "white";
		ctx.strokeRect(this._closeBtn.x, this._closeBtn.y, btnW, btnH);
		ctx.fillStyle = "white";
		ctx.font = "14px Arial";
		ctx.fillText("Close Game (return to menu)", cx, this._closeBtn.y + btnH/2 + 5);
		ctx.restore();
	}

	handleCenterClick(x,y) {
		if (!this.menuOpen) return false;
		if (this._closeBtn &&
			x >= this._closeBtn.x && x <= this._closeBtn.x + this._closeBtn.w &&
			y >= this._closeBtn.y && y <= this._closeBtn.y + this._closeBtn.h) {
			try { this.game.closeToMenu(); } catch (e) {}
			return true;
		}
		return false;
	}

	// sprite selector
	drawSpriteMenu() {
		const cx = this.canvas.width / 2;
		const cy = this.canvas.height / 2;
		const w = 420, h = 220;
		const ctx = this.ctx;
		ctx.save();
		ctx.fillStyle = "rgba(18,18,18,0.95)";
		ctx.fillRect(cx - w/2, cy - h/2, w, h);
		ctx.strokeStyle = "white";
		ctx.lineWidth = 1;
		ctx.strokeRect(cx - w/2, cy - h/2, w, h);

		ctx.fillStyle = "white";
		ctx.font = "18px Arial";
		ctx.textAlign = "center";
		ctx.fillText("Sprite Selector", cx, cy - h/2 + 28);

		const type = this.spriteTypes[this.spriteIndex] || "default";
		ctx.font = "16px Arial";
		ctx.fillText("Type: " + type, cx - 120, cy - 20);
		ctx.fillText("Direction: " + this.spriteDirection, cx + 80, cy - 20);

		// preview first frame id
		let previewId = null;
		try {
			const rows = SpritePlayerList[type]?.[this.spriteDirection] || SpritePlayerList[type]?.down || [];
			for (const row of rows) {
				if (!Array.isArray(row)) continue;
				const nums = row.filter(v => Number.isFinite(v) && v > 0);
				if (nums.length) { previewId = nums[0]; break; }
			}
		} catch (e) { previewId = null; }

		const previewX = cx - 32, previewY = cy;
		ctx.fillStyle = "rgba(255,255,255,0.06)";
		ctx.fillRect(previewX - 8, previewY - 40, 96, 96);
		if (previewId) {
			const img = this.game.loadedImages[String(previewId)];
			if (img && img.complete && img.naturalWidth > 0) ctx.drawImage(img, previewX, previewY - 32, 64, 64);
		}

		ctx.fillStyle = "white";
		ctx.font = "12px Arial";
		ctx.fillText("Use A/D to change, Arrows to change dir, Enter to select", cx, cy + 70);
		ctx.restore();
	}

	// controls
	nextSprite() { 
		this.spriteIndex = (this.spriteIndex + 1) % this.spriteTypes.length;
		const type = this.spriteTypes[this.spriteIndex] || "default";
		this.preloadSpritePreview(type, this.spriteDirection);
		this.game.renderMapImmediate();
	}
	
	prevSprite() { 
		this.spriteIndex = (this.spriteIndex - 1 + this.spriteTypes.length) % this.spriteTypes.length;
		const type = this.spriteTypes[this.spriteIndex] || "default";
		this.preloadSpritePreview(type, this.spriteDirection);
		this.game.renderMapImmediate();
	}
	
	setDirection(dir) { 
		this.spriteDirection = dir;
		const type = this.spriteTypes[this.spriteIndex] || "default";
		this.preloadSpritePreview(type, dir);
		this.game.renderMapImmediate();
	}
	
	getSpriteType() { return this.spriteTypes[this.spriteIndex]; }

	// full click handler used by Game
	handleClickFull(clientX, clientY) {
		if (this.handleClick(clientX, clientY)) return true;
		if (this.menuOpen && this.handleCenterClick(clientX, clientY)) return true;
		return false;
	}
}
