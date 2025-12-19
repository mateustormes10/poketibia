import { PokemonDatabase } from "./listPokemon.js";
import { getSpriteRows } from "./spriteService.js";


export default class Pokemon {
	// aceita objeto spawn {id,name,x,y,z,sprite,element,hp,level} ou {id,name,position:{x,y,z},...}
	constructor(spawn) {
		console.log(`🏗️ Criando Pokemon:`, spawn);
		this.id = spawn.id || (`wild_${Date.now()}`);
		this.name = spawn.name || "Wild";
		// Suporta ambos os formatos: position:{x,y,z} ou x,y,z separados
		const posX = spawn.position?.x ?? spawn.x ?? 0;
		const posY = spawn.position?.y ?? spawn.y ?? 0;
		const posZ = spawn.position?.z ?? spawn.z ?? 0;
		this.position = { x: Number(posX), y: Number(posY), z: Number(posZ) };
		this.level = spawn.level || 1;
		this.hp = spawn.hp ?? 100;
		this.maxHp = spawn.maxHp ?? spawn.hp ?? 100;
		this.element = spawn.element || null;
		// owner / follower support
		this.ownerId = spawn.ownerId || null;
		this.isFollower = !!this.ownerId;

		let sp = spawn.sprite ?? null;
		// se for string com dígitos "[39666]" extrai número
		if (typeof sp === "string") {
			const m = String(sp).match(/\d+/);
			if (m) sp = Number(m[0]);
		}
		this.spriteType = sp; // may be numeric id or spriteType string

		// spriteRows (direction -> rows)
		this.direction = spawn.direction || "down";
		this.spriteRows = [];

		// anim control
		this.animIndex = 0;
		this.animTimer = 0;
		this.animInterval = 0.12; // Tempo entre frames (120ms)
		this.isMoving = false;
		this.currentAnimCycle = 0; // Quantos ciclos completos já fez
		this.targetAnimCycles = 0; // Quantos ciclos deve fazer
		
		// Movimento suave (interpolação)
		this.targetPosition = null; // Posição de destino para interpolação
		this.moveSpeed = 6; // Tiles por segundo (mais rápido = mais suave)
		
		// Cache do último frame válido para evitar flickering durante troca de direção
		this.lastValidParts = [null, null, null];
		
		// Cache de sprites por direção para evitar recarregar
		this.spriteCache = {
			up: null,
			down: null,
			left: null,
			right: null
		};

		// Carrega sprites do PokemonDatabase
		this.loadSpritesFromDatabase();
		
		// Pré-carrega todas as sprites deste Pokémon
		this.preloadAllSprites();

	}
	
	loadSpritesFromDatabase() {
		try {
			// Capitaliza o nome para buscar no database (Pikachu, Charmander, etc)
			const capitalizedName = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
			const pokemonData = PokemonDatabase[capitalizedName] || PokemonDatabase[this.name];
			
			if (pokemonData && pokemonData.spriteList && pokemonData.spriteList[this.direction]) {
				const spriteFrames = pokemonData.spriteList[this.direction];
				
				// Novo formato: [[id1,0,0], [id2,0,0], [id3,0,0]]
				if (Array.isArray(spriteFrames) && spriteFrames.length > 0) {
					if (Array.isArray(spriteFrames[0])) {
						// Já está no formato correto
						this.spriteRows = spriteFrames;
						// Armazena no cache
						this.spriteCache[this.direction] = spriteFrames;
					} else {
						// Formato antigo [id1, id2, id3] - converte
						this.spriteRows = spriteFrames.map(id => [id, 0, 0]);
						// Armazena no cache
						this.spriteCache[this.direction] = this.spriteRows;
					}
					return;
				}
			}
			
			// Fallback: tenta usar spriteType numérico
			if (Number.isFinite(Number(this.spriteType))) {
				this.spriteRows = [[Number(this.spriteType), 0, 0]];
				this.spriteCache[this.direction] = this.spriteRows;
			} else {
				this.spriteRows = [[0, 0, 0]];
				this.spriteCache[this.direction] = this.spriteRows;
			}
		} catch (e) {
			console.error("Erro ao carregar sprites:", e);
			this.spriteRows = [[0, 0, 0]];
			this.spriteCache[this.direction] = this.spriteRows;
		}
	}
	
	// Pré-carrega todas as sprites deste Pokémon para evitar flickering
	preloadAllSprites() {
		try {
			const capitalizedName = this.name.charAt(0).toUpperCase() + this.name.slice(1).toLowerCase();
			const pokemonData = PokemonDatabase[capitalizedName] || PokemonDatabase[this.name];
			
			if (!pokemonData || !pokemonData.spriteList) return;
			
			const directions = ['up', 'down', 'left', 'right'];
			const spritesToLoad = new Set();
			
			// Coleta todos os IDs de sprites de todas as direções
			for (const dir of directions) {
				const spriteFrames = pokemonData.spriteList[dir];
				if (Array.isArray(spriteFrames)) {
					for (const frame of spriteFrames) {
						if (Array.isArray(frame)) {
							// Formato novo [[id1,id2,id3]]
							frame.forEach(id => {
								if (id && id !== 0) spritesToLoad.add(id);
							});
						} else {
							// Formato antigo [id]
							if (frame && frame !== 0) spritesToLoad.add(frame);
						}
					}
				}
			}
			
			// Pré-carrega cada sprite
			spritesToLoad.forEach(spriteId => {
				if (window.game && window.game.loadedImages) {
					const strId = String(spriteId);
					if (!window.game.loadedImages[strId]) {
						const img = new Image();
						img.src = `./assets/sprites/${spriteId}.png`;
						window.game.loadedImages[strId] = img;
					}
				}
			});
			
		} catch (e) {
			console.error("Erro ao pré-carregar sprites:", e);
		}
	}

	// Inicia animação do passo (1 ciclo completo)
	startStepAnimation() {
		if (!this.spriteRows || this.spriteRows.length === 0) return;
		
		this.isMoving = true;
		this.animTimer = 0;
		this.currentAnimCycle = 0;
		this.targetAnimCycles = 1; // 1 ciclo completo por passo
		// Não reseta animIndex para manter continuidade visual
	}
	
	// Atualiza animação baseada em delta time
	update(deltaTime) {
		if (!this.spriteRows || this.spriteRows.length === 0) return;
		
		// Interpolação de movimento suave
		if (this.targetPosition) {
			const dx = this.targetPosition.x - this.position.x;
			const dy = this.targetPosition.y - this.position.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			
			if (distance > 0.02) { // Threshold mínimo reduzido
				const moveDistance = this.moveSpeed * deltaTime;
				
				if (moveDistance >= distance) {
					// Chegou no destino
					this.position.x = this.targetPosition.x;
					this.position.y = this.targetPosition.y;
					this.targetPosition = null;
				} else {
					// Move em direção ao destino
					this.position.x += (dx / distance) * moveDistance;
					this.position.y += (dy / distance) * moveDistance;
					this.isMoving = true;
				}
			} else {
				// Chegou no destino
				this.position.x = this.targetPosition.x;
				this.position.y = this.targetPosition.y;
				this.targetPosition = null;
			}
		}
		
		// Se não está movendo, mantém frame central
		if (!this.isMoving && !this.targetPosition) {
			this.animIndex = 1; // Frame do meio (parado)
			return;
		}
		
		this.animTimer += deltaTime;
		
		// Avança frame quando o timer excede o intervalo
		if (this.animTimer >= this.animInterval) {
			this.animTimer -= this.animInterval;
			this.animIndex++;
			
			// Se completou todas as sprites, incrementa ciclo
			if (this.animIndex >= this.spriteRows.length) {
				this.animIndex = 0;
				this.currentAnimCycle++;
				
				// Se completou os ciclos necessários, para no frame central
				if (this.currentAnimCycle >= this.targetAnimCycles && !this.targetPosition) {
					this.isMoving = false;
					this.animIndex = 1; // Volta pro frame central
					this.animTimer = 0;
				}
			}
		}
	}

	// Move em direção ao alvo, desviando de obstáculos
	moveTowards(targetX, targetY, mapNearby, mapOrigin, allEntities = []) {
		const dx = targetX - this.position.x;
		const dy = targetY - this.position.y;
		const distance = Math.abs(dx) + Math.abs(dy);
		
		// Se já está próximo (1-2 tiles), não move
		if (distance <= 2) {
			this.isMoving = false;
			return;
		}
		
		// Decide direção prioritária
		let moveX = 0, moveY = 0;
		let newDirection = this.direction;
		let moved = false;
		
		if (Math.abs(dx) > Math.abs(dy)) {
			moveX = dx > 0 ? 1 : -1;
			newDirection = dx > 0 ? "right" : "left";
		} else {
			moveY = dy > 0 ? 1 : -1;
			newDirection = dy > 0 ? "down" : "up";
		}
		
		// Tenta mover na direção prioritária
		const newX = this.position.x + moveX;
		const newY = this.position.y + moveY;
		
		if (this.canMove(newX, newY, mapNearby, mapOrigin, allEntities)) {
			this.position.x = newX;
			this.position.y = newY;
			this.updateDirection(newDirection);
			this.startStepAnimation();
			moved = true;
		} else {
			// Se não pode, tenta a direção alternativa
			if (moveX !== 0) {
				// Tentou X, agora tenta Y
				const altY = dy > 0 ? 1 : -1;
				newDirection = dy > 0 ? "down" : "up";
				if (this.canMove(this.position.x, this.position.y + altY, mapNearby, mapOrigin, allEntities)) {
					this.position.y += altY;
					this.updateDirection(newDirection);
					this.startStepAnimation();
					moved = true;
				}
			} else {
				// Tentou Y, agora tenta X
				const altX = dx > 0 ? 1 : -1;
				newDirection = dx > 0 ? "right" : "left";
				if (this.canMove(this.position.x + altX, this.position.y, mapNearby, mapOrigin, allEntities)) {
					this.position.x += altX;
					this.updateDirection(newDirection);
					this.startStepAnimation();
					moved = true;
				}
			}
		}
		
		// Não atualiza isMoving aqui, será gerenciado pela animação
	}
	
	// Atualiza direção e sprites do PokemonDatabase
	updateDirection(newDirection) {
		if (this.direction === newDirection) return;
		
		this.direction = newDirection;
		this.animIndex = 0;
		
		// Verifica se já tem no cache antes de recarregar
		if (this.spriteCache[newDirection]) {
			this.spriteRows = this.spriteCache[newDirection];
		} else {
			// Se não tem no cache, carrega do database
			this.loadSpritesFromDatabase();
		}
	}
	
	canMove(x, y, mapNearby, mapOrigin, allEntities = []) {
		if (!mapNearby || !mapNearby.length || !mapOrigin) return false;
		
		const localX = x - (mapOrigin.x ?? 0);
		const localY = y - (mapOrigin.y ?? 0);
		
		if (localY < 0 || localY >= mapNearby.length) return false;
		
		const row = mapNearby[localY];
		if (!row) return false;
		
		if (localX < 0 || localX >= row.length) return false;
		
		const tile = row[localX];
		if (!tile) return false;
		
		// Mesma lógica do player: parser robusto, verifica último elemento
		const tileStr = String(tile);
		const tileParts = tileStr.replace(/\[|\]/g, "").split(",").map(s => String(s).trim().toUpperCase());
		const lastPart = tileParts[tileParts.length - 1];
		const passable = (lastPart === "S");
		
		if (!passable) return false;
		
		// Verifica colisão com outras entidades (players e pokemons)
		for (const entity of allEntities) {
			if (entity === this) continue; // Ignora a si mesmo
			
			const ex = entity.position?.x ?? entity.x;
			const ey = entity.position?.y ?? entity.y;
			
			if (ex === x && ey === y) {
				return false; // Posição ocupada
			}
		}
		
		return true;
	}

	getCurrentSpriteParts() {
		try {
			const rows = this.spriteRows || [];
			if (!rows || rows.length === 0) return this.lastValidParts;
			
			// Garante que animIndex está dentro do range
			let frameIndex = Math.max(0, Math.min(this.animIndex || 0, rows.length - 1));
			const row = rows[frameIndex];
			
			if (!row) return this.lastValidParts;
			
			// row é [center, left, top]
			// Se não for array ou estiver vazio, retorna último válido
			if (!Array.isArray(row) || row.length === 0) return this.lastValidParts;
			
			// Converte para números, mantendo 0 como válido (só null/undefined viram null)
			const center = (row[0] !== null && row[0] !== undefined) ? Number(row[0]) : null;
			const left = (row[1] !== null && row[1] !== undefined) ? Number(row[1]) : null;
			const top = (row[2] !== null && row[2] !== undefined) ? Number(row[2]) : null;
			
			// Atualiza cache se temos pelo menos o centro válido
			if (center !== null && center !== 0) {
				this.lastValidParts = [center, left, top];
			}
			
			return [center, left, top];
		} catch (e) {
			console.error("Erro em getCurrentSpriteParts:", e, this);
			return this.lastValidParts;
		}
	}

	// util para atualizar sprite tipo/direction dinamicamente
	setSpriteType(sprite, direction = this.direction) {
		this.spriteType = sprite;
		this.direction = direction;
		try {
			if (typeof sprite === "string") this.spriteRows = getSpriteRows(sprite, direction) || [];
			else this.spriteRows = [[ [Number(sprite) || 0, 0, 0] ]];
		} catch (e) {
			this.spriteRows = [[ [Number(sprite) || 0, 0, 0] ]];
		}
		this.animIndex = 0;
		this.animTimer = 0;
	}
}
