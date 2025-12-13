export default class SpriteManager {
    constructor() {
        this.cache = {};
    }

    get(id) {
        if (!this.cache[id]) {
            const img = new Image();
            img.src = `./assets/sprites/${id}.png`;
            this.cache[id] = img;
        }
        return this.cache[id];
    }
}

export const Sprites = new SpriteManager();
