export default class Entity {
    constructor(x, y, spriteId = 33648) {
        this.x = x;
        this.y = y;
        this.spriteId = spriteId;
        this.frame = 0;
        this.frameTick = 0;
    }

    updateAnimation() {
        this.frameTick++;
        if (this.frameTick >= 10) {
            this.frameTick = 0;
            this.frame = (this.frame + 1) % 4; // exemplo 4 frames
        }
    }
}
