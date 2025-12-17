import Entity from "./entity.js";
import { SpritePlayerList } from "./SpritePlayerList.js";
export default class Player extends Entity {
    constructor(x, y, name = "Undefined", spriteType = "default") {
        super(x, y, 36204);

        this.name = name;
        this.speed = 0.1;

        this.setSpriteType(spriteType);
    }

    setSpriteType(spriteType) {
        const list = SpritePlayerList[spriteType] || SpritePlayerList.default;

        this.spriteType = spriteType;
        this.spriteList = list;

        this.direction = "down";
        this.currentGroup = 0;
        this.animTimer = 0;
        this.animInterval = 0.15;
        this.moving = false;

        this.spriteId = this.spriteList.down[0][0];
    }


    update(input, map, entities, follower, currentZ) {
        let moved = false;
        let nx = this.x;
        let ny = this.y;

        // movimento normal
        if (input.isDown("ArrowUp")) { ny -= this.speed; this.direction = "up"; }
        if (input.isDown("ArrowDown")) { ny += this.speed; this.direction = "down"; }
        if (input.isDown("ArrowLeft")) { nx -= this.speed; this.direction = "left"; }
        if (input.isDown("ArrowRight")) { nx += this.speed; this.direction = "right"; }

        // validar limites do mapa
        if (nx < 0 || ny < 0 || nx >= map.size || ny >= map.size) { nx = this.x; ny = this.y; }

        const tile = map.getTile(Math.floor(nx), Math.floor(ny));

        if (tile && tile.walkable === false) { nx = this.x; ny = this.y; }

        // ESCADAS
        if (tile) {
            if (!this._floorChangeLocked) {
                if (tile.up !== null && tile.up !== undefined && tile.up !== currentZ) {
                    this._floorChangeLocked = true;
                    return { action: "CHANGE_FLOOR", targetZ: tile.up };
                }
                if (tile.down !== null && tile.down !== undefined && tile.down !== currentZ) {
                    this._floorChangeLocked = true;
                    return { action: "CHANGE_FLOOR", targetZ: tile.down };
                }
            } else if (tile.up === null && tile.down === null) {
                this._floorChangeLocked = false; // reset quando sair do tile de escada
            }

        }

        if (nx !== this.x || ny !== this.y) {
            this.x = nx;
            this.y = ny;
            moved = true;
        }

        this.moving = moved;

        if (!moved) {
            this.currentGroup = 0;
            const group = this._getCurrentGroup();
            if (group && group[0]) this.spriteId = group[0];
        }

        return null;
    }



    // Atualiza o grupo (troca de conjunto 3-imagens) — deltaTime em segundos
    updateAnimation(delta) {
        if (!this.moving) return;

        this.animTimer += delta;
        if (this.animTimer < this.animInterval) return;
        this.animTimer = 0;

        const groups = this.spriteList[this.direction];
        this.currentGroup = (this.currentGroup + 1) % groups.length;
        this.spriteId = groups[this.currentGroup][0];
    }


    _getCurrentGroup() {
        const groups = this.spriteList[this.direction];
        if (!groups || groups.length === 0) return null;
        return groups[this.currentGroup % groups.length];
    }

    // retorna as 3 partes (pode retornar menos se não existir)
    getCurrentSpriteParts() {
        return this.spriteList[this.direction][this.currentGroup];
    }
}
