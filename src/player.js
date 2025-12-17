import Entity from "./entity.js";
import { SpritePlayerList } from "./SpritePlayerList.js";

export default class Player extends Entity {
    constructor(x, y, name = "Undefined", spriteType = "default", spriteId = null) {
        super(x, y, spriteId ?? 36204);

        this.name = name;
        this.speed = 0.1;

        this.setSpriteType(spriteType);

        if (spriteId !== null) this.spriteId = spriteId; // usa sprite do backend
    }

    setSpriteType(spriteType) {
        const list = SpritePlayerList[spriteType] || SpritePlayerList.default;

        this.spriteType = spriteType;
        this.spriteList = list;

        this.direction = "down";
        this.animTimer = 0;
        this.animInterval = 0.15;
        this.moving = false;

        // fallback se não tiver sprite do backend
        if (!this.spriteId) this.spriteId = this.spriteList.down[0][0];
    }

    update(input, map, entities, follower, currentZ) {
        let moved = false;
        let nx = this.x;
        let ny = this.y;

        // movimento
        if (input.isDown("ArrowUp")) { ny -= this.speed; this.direction = "up"; }
        if (input.isDown("ArrowDown")) { ny += this.speed; this.direction = "down"; }
        if (input.isDown("ArrowLeft")) { nx -= this.speed; this.direction = "left"; }
        if (input.isDown("ArrowRight")) { nx += this.speed; this.direction = "right"; }

        // limites do mapa
        if (nx < 0 || ny < 0 || nx >= map.size || ny >= map.size) { nx = this.x; ny = this.y; }

        const tile = map.getTile(Math.floor(nx), Math.floor(ny));
        if (tile && tile.walkable === false) { nx = this.x; ny = this.y; }

        // escadas
        if (tile) {
            if (!this._floorChangeLocked) {
                if (tile.up != null && tile.up !== currentZ) {
                    this._floorChangeLocked = true;
                    return { action: "CHANGE_FLOOR", targetZ: tile.up };
                }
                if (tile.down != null && tile.down !== currentZ) {
                    this._floorChangeLocked = true;
                    return { action: "CHANGE_FLOOR", targetZ: tile.down };
                }
            } else if (tile.up == null && tile.down == null) {
                this._floorChangeLocked = false;
            }
        }

        if (nx !== this.x || ny !== this.y) {
            this.x = nx;
            this.y = ny;
            moved = true;
        }

        this.moving = moved;
        return null;
    }

    updateAnimation(delta, serverSpriteId) {
        if (!this.moving) return;

        this.animTimer += delta;
        if (this.animTimer < this.animInterval) return;
        this.animTimer = 0;

        // atualiza sprite central direto com serverSpriteId ou fallback
        if (serverSpriteId !== undefined && serverSpriteId !== null) {
            this.spriteId = serverSpriteId;
        } else {
            // animação automática usando spriteList
            const frames = this.spriteList[this.direction];
            if (frames && frames.length > 0) {
                const index = Math.floor(Date.now() / 150) % frames.length;
                this.spriteId = frames[index][0]; // apenas sprite central
            }
        }
    }

    getCurrentSpriteParts() {
        // fallback: só retorna sprite central
        return [this.spriteId];
    }
}
