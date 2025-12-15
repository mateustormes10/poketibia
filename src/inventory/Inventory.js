export default class Inventory {
    constructor(cols, rows) {
        this.cols = cols;
        this.rows = rows;
        this.slots = Array(cols * rows).fill(null);
        this.visible = false;
        this.draggingItem = null;
        this.dragFrom = null;
    }

    toggle() {
        this.visible = !this.visible;
        console.log("Inventory:", this.visible);
    }

    addItem(item) {
        const idx = this.slots.findIndex(s => s === null);
        if (idx >= 0) {
            this.slots[idx] = item;
            return true;
        }
        return false;
    }

    swap(a, b) {
        [this.slots[a], this.slots[b]] =
        [this.slots[b], this.slots[a]];
    }

    getSlotFromMouse(mx, my) {
        const slotSize = 48;
        const startX = (window.innerWidth - this.cols * slotSize) / 2;
        const startY = (window.innerHeight - this.rows * slotSize) / 2;

        const x = Math.floor((mx - startX) / slotSize);
        const y = Math.floor((my - startY) / slotSize);

        if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return null;
        return y * this.cols + x;
    }
}
