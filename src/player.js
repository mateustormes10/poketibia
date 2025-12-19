import getSpriteFrames, { getSpriteRows } from "./spriteService.js";

export default class PlayerEntity {
	constructor() {
		this.position = { x: 0, y: 0, z: 0 };
		this.spriteFrames = []; // ex: [36192,36193,36194] (primeira linha)
		this.spriteRows = { up: [], down: [], left: [], right: [] }; // todas as rows por direção
		this.direction = "down";
		this.animIndex = 0;
		this.animTimer = 0;
		this.animInterval = 0.15; // segundos
		this.isMoving = false; // controlar se animação deve rodar
		this.moveTimeout = null; // timeout handle para parar animação do movimento
		
		// Inicializa nome e vida com valores padrão
		this.name = "";
		this.hp = 100;
		this.maxHp = 100;
		
		// Carrega sprite inicial padrão (default down)
		this.loadSprite("default", "down");
	}

	loadSprite(type = "default", direction = "down") {
		// valida se a direção possui frames válidos; caso contrário, força default
		const candidateRows = getSpriteRows(type, direction) || [];
		const hasValid = candidateRows.some(r => Array.isArray(r) && r.some(v => Number.isFinite(v) && v > 0));
		const typeToUse = hasValid ? type : "default";

		// carrega todas as rows para cada direção com o tipo escolhido
		const dirs = ["up", "down", "left", "right"];
		dirs.forEach(d => {
			this.spriteRows[d] = getSpriteRows(typeToUse, d) || [];
		});

		this.direction = direction;
		this.animIndex = 0;
		this.animTimer = 0;

		// mantém linha atual para compat
		this.spriteFrames = (this.spriteRows[direction] && this.spriteRows[direction][0])
			? this.spriteRows[direction][0].filter(v => Number.isFinite(v) && v > 0)
			: [];
		return this.spriteFrames;
	}

	setPositionCenter(mapNearby, mapOrigin, z = 0) {
		if (!mapNearby || !mapNearby.length) return;
		const cols = mapNearby[0]?.length || 0;
		const rows = mapNearby.length;
		const centerX = Math.floor(cols / 2);
		const centerY = Math.floor(rows / 2);
		this.position.x = (mapOrigin?.x ?? 0) + centerX;
		this.position.y = (mapOrigin?.y ?? 0) + centerY;
		this.position.z = z;
	}

	updateAnimation(deltaSec = 0) {
		// se não estiver movendo, manter frame central (índice 0)
		if (!this.isMoving) {
			this.animTimer = 0;
			this.animIndex = 0;
			// atualiza spriteFrames para compatibilidade (linha atual)
			const rowsIdle = this.spriteRows[this.direction] || [];
			const curIdle = rowsIdle[0] || [];
			this.spriteFrames = curIdle.filter(v => Number.isFinite(v) && v > 0);
			return;
		}

		// delta em segundos
		const rows = this.spriteRows[this.direction] || [];
		if (!rows.length) return;
		this.animTimer += deltaSec;
		if (this.animTimer >= this.animInterval) {
			this.animTimer -= this.animInterval;
			this.animIndex = (this.animIndex + 1) % rows.length;
		}
		// atualiza spriteFrames para compatibilidade (linha atual)
		const cur = rows[this.animIndex] || [];
		this.spriteFrames = cur.filter(v => Number.isFinite(v) && v > 0);
	}

	getCurrentSpriteParts() {
		// retorna [centerId, leftId, topId] (pode conter undefined)
		const rows = this.spriteRows[this.direction] || [];
		const row = rows[this.animIndex] || rows[0] || [];
		// row expected [center, left, top]
		const center = Number(row[0]) || null;
		const left = Number(row[1]) || null;
		const top = Number(row[2]) || null;
		const result = [center, left, top];
		// Debug: mostra apenas se center for null (problema!)
		if (!center && rows.length > 0) {
			console.warn("getCurrentSpriteParts retornou null!", {
				direction: this.direction,
				animIndex: this.animIndex,
				rowsLength: rows.length,
				row: row
			});
		}
		return result;
	}

	// altera o tipo de sprite do personagem (local)
	setSpriteType(type, direction = this.direction) {
		try {
			this.loadSprite(type, direction);
			this.direction = direction;
			// garante frame inicial
			this.animIndex = 0;
			this.animTimer = 0;
		} catch (e) {}
	}
}