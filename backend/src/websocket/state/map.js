import fs from "fs";
import path from "path";

const MAP_SIZE = 500;
const MIN_Z = 1;
const MAX_Z = 5;

// map[z][y][x] = { walkable: boolean }
const mapLayers = new Map();

/**
 * Carrega todos os mapas na memória
 */
function loadMaps() {
    for (let z = MIN_Z; z <= MAX_Z; z++) {
        const filePath = path.resolve(
            process.cwd(),
            "../assets",
            `map_z${z}.txt`
        );

        if (!fs.existsSync(filePath)) {
            console.warn(`[MAP] Arquivo não encontrado: map_z${z}.txt`);
            continue;
        }

        console.log(`[MAP] Carregando map_z${z}.txt`);

        const content = fs.readFileSync(filePath, "utf8");
        const rows = content
            .trim()
            .split("\n")
            .map(line => line.trim());

        if (rows.length !== MAP_SIZE) {
            console.warn(`[MAP] map_z${z}.txt não tem ${MAP_SIZE} linhas`);
        }

        const layer = [];

        for (let y = 0; y < rows.length; y++) {
            const row = rows[y];

            // separa: [10358,S] [10358,N] ...
            const cells = row.match(/\[.*?\]/g);

            if (!cells || cells.length !== MAP_SIZE) {
                console.warn(`[MAP] Linha ${y} do map_z${z} inválida`);
                continue;
            }

            const line = [];

            for (let x = 0; x < cells.length; x++) {
                const cell = cells[x]
                    .replace("[", "")
                    .replace("]", "");

                const parts = cell.split(",");
                const flag = parts[parts.length - 1];

                line.push({
                    walkable: flag === "S"
                });
            }

            layer.push(line);
        }

        mapLayers.set(z, layer);
    }

    console.log(`[MAP] Mapas carregados: ${[...mapLayers.keys()].join(", ")}`);
}

/**
 * Retorna tile do mapa
 */
function getTile(x, y, z) {
    const layer = mapLayers.get(z);
    if (!layer) return null;

    if (y < 0 || y >= layer.length) return null;
    if (x < 0 || x >= layer[y].length) return null;

    return layer[y][x];
}

/**
 * API pública
 */
export const gameMap = {
    getTile
};

// carrega automaticamente ao iniciar o servidor
loadMaps();
