import Entity from "./entity.js";

export default class Player extends Entity {
    constructor(x, y, name = "Undefined") {
        super(x, y, 36204);

        this.name = name;
        this.speed = 0.1;

        // Cada direção tem N grupos; cada grupo tem 3 partes: [center, left, top]
        this.spriteList = {
            up: [
                [36192, 36193, 36194],
                [36216, 36217, 36218],
                [36240, 36241, 36242]
            ],
            down: [
                [36204, 36205, 36206],
                [36228, 36229, 36230],
                [36252, 36253, 36254]
            ],
            left: [
                [36210, 36211, 36212],
                [36234, 36235, 36236],
                [36258, 36259, 36260]
            ],
            right: [
                [36198, 36199, 36200],
                [36222, 36223, 36224],
                [36246, 36247, 36248]
            ]
        };

        this.direction = "down";         // direção atual
        this.currentGroup = 0;           // índice do grupo atual dentro de spriteList[direction]
        this.animTimer = 0;              // acumulador de tempo para troca de grupo
        this.animInterval = 1;         // tempo por grupo em segundos

        // usado apenas por compatibilidade (opcional)
        this.spriteId = this.spriteList.down[0][0];
    }

    update(input, map) {
        let moved = false;

        let nx = this.x;
        let ny = this.y;

        // mover para cima
        if (input.isDown("ArrowUp")) {
            ny -= this.speed;
            this.direction = "up";
        }

        // mover para baixo
        if (input.isDown("ArrowDown")) {
            ny += this.speed;
            this.direction = "down";
        }

        // mover para esquerda
        if (input.isDown("ArrowLeft")) {
            nx -= this.speed;
            this.direction = "left";
        }

        // mover para direita
        if (input.isDown("ArrowRight")) {
            nx += this.speed;
            this.direction = "right";
        }

        // Validar limites do mapa
        if (nx < 0 || ny < 0 || nx >= map.size || ny >= map.size) {
            return;
        }

        // Checa tile destino
        const tile = map.getTile(Math.floor(nx), Math.floor(ny));
        if (tile && tile.walkable === false) {
            return;
        }

        // Movimento válido
        if (nx !== this.x || ny !== this.y) {
            this.x = nx;
            this.y = ny;
            moved = true;
        }

        // Atualiza animação em movimento
        if (moved) {
            // Troca de grupo a cada movimento
            this.currentGroup = (this.currentGroup + 1) % this.spriteList[this.direction].length;
            const group = this._getCurrentGroup();
            if (group && group[0]) this.spriteId = group[0];
        } else {
            // Para parado
            this.currentGroup = 0;
            const group = this._getCurrentGroup();
            if (group && group[0]) this.spriteId = group[0];
        }
    }

    // Atualiza o grupo (troca de conjunto 3-imagens) — deltaTime em segundos
    updateAnimation(deltaTime = 1) {
        this.animTimer += deltaTime;
        if (this.animTimer < this.animInterval) return;
        this.animTimer = 0;

        const groups = this.spriteList[this.direction];
        if (!groups || groups.length === 0) return;

        this.currentGroup = (this.currentGroup + 1) % groups.length;

        // atualiza spriteId de referência (primeira parte do grupo)
        const group = this._getCurrentGroup();
        if (group && group[0]) this.spriteId = group[0];
    }

    _getCurrentGroup() {
        const groups = this.spriteList[this.direction];
        if (!groups || groups.length === 0) return null;
        return groups[this.currentGroup % groups.length];
    }

    // retorna as 3 partes (pode retornar menos se não existir)
    getCurrentSpriteParts() {
        const g = this._getCurrentGroup();
        if (!g) return [];
        return g; // array [center, left, top]
    }
}
