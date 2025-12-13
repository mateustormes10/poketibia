export default class MapLoader {
    constructor(size) {
        this.size = size;
        this.grid = Array.from({ length: size }, () =>
            Array.from({ length: size }, () => null)
        );
    }

    async load(path) {
        const txt = await fetch(path).then(r => r.text());
        const lines = txt.split("\n");

        for (let y = 0; y < this.size; y++) {
            if (!lines[y]) continue;

            const row = lines[y].trim().split(/\s+/);

            for (let x = 0; x < this.size; x++) {
                const cell = row[x];
                if (!cell) continue;

                this.grid[y][x] = this.parseCell(cell);
            }
        }
    }

    parseCell(cell) {
        // Tile simples numérico
        if (!cell.startsWith("[") || !cell.endsWith("]")) {
            const id = parseInt(cell);
            return {
                ground: [isNaN(id) ? 0 : id],
                entities: [],
                S: false,
                walkable: true
            };
        }

        // Remove colchetes e quebra itens
        const raw = cell.slice(1, -1).split(",");
        const tile = {
            ground: [],
            entities: [],
            S: false,
            walkable: true
        };

        for (let item of raw) {
            item = item.trim();

            // Número → sprite de chão
            if (!isNaN(parseInt(item))) {
                tile.ground.push(parseInt(item));
                continue;
            }

            // Flag "S" → walkable OK
            if (item === "S") {
                tile.S = true;
                tile.walkable = true;
                continue;
            }

            // Flag "N" → NÃO walkable
            if (item === "N") {
                tile.S = false;
                tile.walkable = false;
                continue;
            }

            // Spawn
            if (item.startsWith("SPAWN(") && item.endsWith(")")) {
                const name = item.slice(6, -1);
                tile.entities.push({
                    type: "pokemon",
                    name
                });
                continue;
            }
        }

        // Pelos menos um chão deve existir
        if (tile.ground.length === 0)
            tile.ground.push(0);

        return tile;
    }


    getTile(x, y) {
        if (x < 0 || y < 0 || x >= this.size || y >= this.size) return null;
        return this.grid[y][x];
    }
}
