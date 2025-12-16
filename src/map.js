
import { TileActions } from "./TileActions.js";
export default class MapLoader {
    constructor(size) {
        this.size = size;
        this.grid = Array.from({ length: size }, () =>
            Array.from({ length: size }, () => null)
        );

         // 🔥 efeitos ativos de skills (SkillEffect)
        this.activeEffects = [];
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
        const raw = splitOutsideParens(cell.slice(1, -1));

        const tile = {
            ground: [],    // chão
            overlay: [],   // árvores, postes, topo
            entities: [],
            S: false,
            walkable: true,
            up: null,
            down: null,
            data: {}
        };


        for (let item of raw) {
            item = item.trim();

            const match = item.match(/^(\d+)(?:\(([^)]*)\))?$/);

            if (match) {
                const id = parseInt(match[1]);
                const param = match[2]; // pode ser undefined

                const action = TileActions?.[id];
                const layer = action?.layer || "ground";

                if (layer === "overlay") {
                    tile.overlay.push(id);
                } else {
                    tile.ground.push(id);
                }

                // 🔹 salva parâmetro no tile
                if (param !== undefined) {
                    tile.data[id] = param;
                }

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

            // Escada para cima
            if (item.startsWith("UP(") && item.endsWith(")")) {
                tile.up = parseInt(item.slice(3, -1));
                continue;
            }

            // Escada para baixo
            if (item.startsWith("DOWN(") && item.endsWith(")")) {
                tile.down = parseInt(item.slice(5, -1));
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

    // =========================================================
    // 🔥 SISTEMA DE EFEITOS DE SKILL
    // =========================================================

    updateEffects(deltaMs) {
        for (let fx of this.activeEffects) {
            fx.update(deltaMs);
        }

        // remove efeitos finalizados
        this.activeEffects = this.activeEffects.filter(fx => !fx.finished);
    }

    // retorna apenas efeitos visíveis na câmera
    getEffectsInView(camX, camY, viewW, viewH) {
        return this.activeEffects.filter(fx =>
            fx.x >= camX &&
            fx.y >= camY &&
            fx.x < camX + viewW &&
            fx.y < camY + viewH
        );
    }


}

function splitOutsideParens(str) {
    const result = [];
    let current = "";
    let depth = 0;

    for (const char of str) {
        if (char === "(") depth++;
        if (char === ")") depth--;

        if (char === "," && depth === 0) {
            result.push(current.trim());
            current = "";
        } else {
            current += char;
        }
    }

    if (current) result.push(current.trim());
    return result;
}
