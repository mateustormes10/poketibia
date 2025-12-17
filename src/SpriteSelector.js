import { SpritePlayerList } from "./SpritePlayerList.js";

export default class SpriteSelector {
    constructor() {
        this.keys = Object.keys(SpritePlayerList);
        this.index = 0;

        this.direction = "down";
        this.frame = 0;

        this.animTimer = 0;
        this.animInterval = 200; // ms
    }

    next() {
        this.index = (this.index + 1) % this.keys.length;
        this.frame = 0;
    }

    prev() {
        this.index = (this.index - 1 + this.keys.length) % this.keys.length;
        this.frame = 0;
    }

    setDirection(dir) {
        this.direction = dir;
        this.frame = 0;
    }

    update(deltaMs) {
        this.animTimer += deltaMs;
        if (this.animTimer < this.animInterval) return;
        this.animTimer = 0;

        const list = this.getSpriteList();
        this.frame = (this.frame + 1) % list[this.direction].length;
    }

    getSpriteType() {
        return this.keys[this.index];
    }

    getSpriteList() {
        return SpritePlayerList[this.getSpriteType()];
    }

    getCurrentFrame() {
        return this.getSpriteList()[this.direction][this.frame];
    }
}
