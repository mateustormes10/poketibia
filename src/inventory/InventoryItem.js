export default class InventoryItem {
    constructor({ id, name, sprite, type, data }) {
        this.id = id;
        this.name = name;
        this.sprite = sprite;
        this.type = type; // "pokemon", "item", "pokeball"
        this.data = data;
    }
}
