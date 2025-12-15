export default class Input {
    constructor(canvas) {
        this.keys = {};
        this.mouse = { x: 0, y: 0, released: false };

        window.addEventListener("keydown", e => this.keys[e.key] = true);
        window.addEventListener("keyup", e => this.keys[e.key] = false);

        canvas.addEventListener("mousemove", e => {
            const rect = canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener("mouseup", () => {
            this.mouse.released = true;
            setTimeout(() => this.mouse.released = false, 0);
        });
    }

    isDown(key) {
        return this.keys[key];
    }
}
