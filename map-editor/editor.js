const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
const spriteListDiv = document.getElementById("sprite-list");
const walkableCheckbox = document.getElementById("walkable");
const spawnCheckbox = document.getElementById("spawn");
const saveBtn = document.getElementById("saveBtn");
const prevSpritesBtn = document.getElementById("prevSprites");
const nextSpritesBtn = document.getElementById("nextSprites");
const brushSizeSelect = document.getElementById("brushSize");

// -------------------- SALVAR MAP (Node.js / Electron) --------------------
const fs = require('fs');
const path = require('path');

const tileSize = 32;
const mapSize = 500; // mapa real
const viewWidth = canvas.width / tileSize;  // tiles visíveis horizontal
const viewHeight = canvas.height / tileSize; // tiles visíveis vertical

let mapData = [];
let sprites = new Map();
let selectedSpriteId = null;
let spritePage = 0;
const spritesPerPage = 250;

let cursorX = 0;
let cursorY = 0;
let cameraX = 0;
let cameraY = 0;

let clipboard = null; // guarda o conteúdo da célula/copiar
let undoStack = [];   // pilha de ações para Ctrl+Z


const spriteSearch = document.getElementById("spriteSearch");
const spriteGroupSearch = document.getElementById("spriteGroupSearch");
const deselectSpriteBtn = document.getElementById("deselectSprite");
const tileXSpan = document.getElementById("tileX");
const tileYSpan = document.getElementById("tileY");
const tileContentSpan = document.getElementById("tileContent");

let spriteFilter = ""; // filtro de busca
let spriteGroupFilter = null;
const totalSprites = 65000;

// Inicializa matriz
for (let y = 0; y < mapSize; y++) {
  mapData[y] = [];
  for (let x = 0; x < mapSize; x++) {
    mapData[y][x] = { ground: [], walkable: true, spawn: null, entities: [] };
  }
}


// -------------------- Botão desselecionar --------------------
deselectSpriteBtn.addEventListener("click", () => {
    selectedSpriteId = null;
    document.querySelectorAll(".sprite").forEach(s => s.classList.remove("selected"));
});

spriteSearch.addEventListener("input", () => {
    spriteFilter = spriteSearch.value.trim();
    
    // Se for um número válido, calcula o grupo e aplica no filtro de grupo
    const id = parseInt(spriteFilter);
    if (!isNaN(id) && id >= 1 && id <= totalSprites) {
        const group = Math.ceil(id / spritesPerPage); // calcula o grupo do ID
        spriteGroupSearch.value = group; // preenche automaticamente o filtro de grupo
        spriteGroupFilter = group; // aplica o filtro do grupo
    } else {
        spriteGroupFilter = null; // se não for um ID válido, limpa o filtro de grupo
        spriteGroupSearch.value = ""; // limpa o campo de grupo
    }

    renderSpriteList();
});

spriteGroupSearch.addEventListener("input", () => {
    const val = parseInt(spriteGroupSearch.value);
    if (!isNaN(val) && val >= 1) {
        spriteGroupFilter = val;
        spriteFilter = ""; // limpa filtro de ID ao digitar grupo
        renderSpriteList();
    }
});


// -------------------- CARREGAR SPRITES --------------------

let loadedSprites = new Map(); // cache de sprites já carregadas

async function loadSpritesPage(page) {
    const start = page * spritesPerPage + 1;
    const end = Math.min(start + spritesPerPage - 1, 65000); // limite total

    const promises = [];
    for (let i = start; i <= end; i++) {
        if (loadedSprites.has(i)) continue; // já carregada

        const img = new Image();
        img.src = `../assets/sprites/${i}.png`;
        const p = new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
        promises.push(p);
        loadedSprites.set(i, img);
    }

    await Promise.all(promises);
}



const spawnNameInput = document.getElementById("spawnName");

spawnCheckbox.addEventListener("change", () => {
    spawnNameInput.disabled = !spawnCheckbox.checked;
});
canvas.addEventListener("click", async (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left)/tileSize) + cameraX;
    const y = Math.floor((e.clientY - rect.top)/tileSize) + cameraY;
    const size = parseInt(brushSizeSelect.value);
    const half = Math.floor(size / 2);

    // guarda o estado atual do bloco para desfazer
    const undoBlock = [];

    for (let dy = -half; dy <= half; dy++) {
        for (let dx = -half; dx <= half; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= mapSize || ny >= mapSize) continue;

            const ntile = mapData[ny][nx];

            // salva cópia para undo
            undoBlock.push({
                x: nx,
                y: ny,
                tile: { 
                    ground: [...ntile.ground],
                    walkable: ntile.walkable,
                    spawn: ntile.spawn,
                    entities: [...ntile.entities.map(e => ({...e}))]
                }
            });

            if (selectedSpriteId) {
                if (!ntile.ground.includes(selectedSpriteId)) {
                    ntile.ground.push(selectedSpriteId);
                    if(!sprites.has(selectedSpriteId)) {
                        const img = new Image();
                        img.src = `../assets/sprites/${selectedSpriteId}.png`;
                        await new Promise(resolve => { img.onload = resolve; img.onerror = resolve; });
                        sprites.set(selectedSpriteId, img);
                    }
                }
            }

            ntile.walkable = walkableCheckbox.checked;
            ntile.spawn = spawnCheckbox.checked ? spawnNameInput.value.trim() || "POKEMON" : null;
        }
    }

    // adiciona à pilha de undo
    undoStack.push(undoBlock);

    cursorX = x; cursorY = y;
    tileXSpan.textContent = x;
    tileYSpan.textContent = y;
    tileContentSpan.textContent = `[${mapData[y][x].ground.join(",")},${mapData[y][x].walkable ? "S" : "N"}${mapData[y][x].spawn ? ",SPAWN(" + mapData[y][x].spawn + ")" : ""}]`;

    render();
});




// -------------------- RENDERIZAÇÃO DA LISTA DE SPRITES --------------------
async function renderSpriteList() {
    spriteListDiv.innerHTML = '';

    let filteredIds = [];

    // Se tiver filtro por ID
    if (spriteFilter) {
        const id = parseInt(spriteFilter);
        if (!isNaN(id) && id >= 1 && id <= totalSprites) {
            filteredIds.push(id);
            // Calcula a página automaticamente
            spritePage = Math.floor((id - 1) / spritesPerPage);
        }
    } else if (spriteGroupFilter) {
        // Se houver filtro por grupo
        const startId = (spriteGroupFilter - 1) * spritesPerPage + 1;
        const endId = Math.min(spriteGroupFilter * spritesPerPage, totalSprites);
        for (let i = startId; i <= endId; i++) filteredIds.push(i);
        spritePage = spriteGroupFilter - 1;
    } else {
        // Nenhum filtro: pega todos os sprites da página atual
        const startId = spritePage * spritesPerPage + 1;
        const endId = Math.min(startId + spritesPerPage - 1, totalSprites);
        for (let i = startId; i <= endId; i++) filteredIds.push(i);
    }

    // carrega sprites que ainda não estão no cache
    const promises = [];
    for (let id of filteredIds) {
        if (!loadedSprites.has(id)) {
            const img = new Image();
            img.src = `../assets/sprites/${id}.png`;
            const p = new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
            promises.push(p);
            loadedSprites.set(id, img);
        }
    }
    await Promise.all(promises);

    // renderiza sprites
    for (let id of filteredIds) {
        const img = loadedSprites.get(id);
        if (!img) continue;
        const div = document.createElement("img");
        div.src = img.src;
        div.title = id;
        div.classList.add("sprite");
        div.addEventListener("click", () => {
            document.querySelectorAll(".sprite").forEach(s => s.classList.remove("selected"));
            div.classList.add("selected");
            selectedSpriteId = id;
        });
        spriteListDiv.appendChild(div);
    }
}


// -------------------- Navegação de páginas --------------------
prevSpritesBtn.addEventListener("click", async () => {
    if (spritePage > 0) spritePage--;
    await renderSpriteList();
});

nextSpritesBtn.addEventListener("click", async () => {
    spritePage++;
    await renderSpriteList();
});

// -------------------- PARSE MAPA --------------------

function parseCell(cell) {
    if (!cell.startsWith("[") || !cell.endsWith("]")) return { ground: [], walkable: true, spawn: null, entities: [] };

    const raw = cell.slice(1, -1).split(",");
    const tile = { ground: [], walkable: true, spawn: null, entities: [] };

    for (let item of raw) {
        item = item.trim();
        if (!isNaN(parseInt(item))) tile.ground.push(parseInt(item));
        else if (item === "S") tile.walkable = true;
        else if (item === "N") tile.walkable = false;
        else if (item.startsWith("SPAWN(") && item.endsWith(")")) 
            tile.entities.push({ type: "pokemon", name: item.slice(6, -1) });
    }

    return tile;
}


async function loadMap(path) {
    const txt = await fetch(path).then(r => r.text());
    const lines = txt.split("\n");

    // inicializa matriz
    mapData = Array.from({ length: mapSize }, () => 
        Array.from({ length: mapSize }, () => ({ ground: [], walkable: true, spawn: null, entities: [] }))
    );

    for (let y = 0; y < mapSize; y++) {
        if (!lines[y]) continue;
        const row = lines[y].trim().split(/\s+/);
        for (let x = 0; x < mapSize; x++) {
            if (!row[x]) continue;
            mapData[y][x] = parseCell(row[x]);
        }
    }
}

// -------------------- RENDER DO MAPA --------------------
function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for (let vy = 0; vy < viewHeight; vy++) {
        for (let vx = 0; vx < viewWidth; vx++) {
            const mx = cameraX + vx;
            const my = cameraY + vy;
            if (mx >= mapSize || my >= mapSize) continue;

            const tile = mapData[my][mx];

            // DESENHA SPRITES EMPILHADAS
            tile.ground.forEach(id => {
                const img = sprites.get(id);
                if (img && img.complete && img.naturalWidth > 0) {
                    ctx.drawImage(img, vx*tileSize, vy*tileSize, tileSize, tileSize);
                }
            });


            // OVERLAY WALKABLE
            if (!tile.walkable) {
                ctx.fillStyle = "rgba(255,0,0,0.3)";
                ctx.fillRect(vx*tileSize, vy*tileSize, tileSize, tileSize);
            }

            // OVERLAY SPAWN
            if (tile.spawn || tile.entities.length > 0) {
                ctx.fillStyle = "rgba(0,255,0,0.3)";
                ctx.fillRect(vx*tileSize, vy*tileSize, tileSize, tileSize);
            }

            ctx.strokeStyle = "gray";
            ctx.strokeRect(vx*tileSize, vy*tileSize, tileSize, tileSize);
        }
    }

    // CURSOR
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeRect((cursorX-cameraX)*tileSize, (cursorY-cameraY)*tileSize, tileSize, tileSize);
}


// -------------------- CLIQUE NA GRID --------------------
canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / tileSize) + cameraX;
  const y = Math.floor((e.clientY - rect.top) / tileSize) + cameraY;
  const tile = mapData[y][x];

  if (selectedSpriteId) {
    if (!tile.ground.includes(selectedSpriteId)) tile.ground.push(selectedSpriteId);
  }
  tile.walkable = walkableCheckbox.checked;
  tile.spawn = spawnCheckbox.checked ? spawnNameInput.value.trim() || "POKEMON" : null;

  cursorX = x; cursorY = y;
  // Atualiza display da célula
    tileXSpan.textContent = x;
    tileYSpan.textContent = y;
    tileContentSpan.textContent = `[${tile.ground.join(",")},${tile.walkable ? "S" : "N"}${tile.spawn ? ",SPAWN(" + tile.spawn + ")" : ""}]`;

  render();
});

// -------------------- TECLADO --------------------
document.addEventListener("keydown", (e) => {

  const ctrl = e.ctrlKey || e.metaKey; // suporta Ctrl ou Command

    // ------------------ COPIAR ------------------
    if (ctrl && e.key.toLowerCase() === "c") {
        clipboard = JSON.parse(JSON.stringify(mapData[cursorY][cursorX])); // cópia profunda
        e.preventDefault();
        console.log("Copiado:", clipboard);
    }

    // ------------------ COLAR ------------------
    if (ctrl && e.key.toLowerCase() === "v" && clipboard) {
        const size = 1; // cola apenas na célula selecionada
        const undoBlock = [];
        for (let dy = 0; dy < size; dy++) {
            for (let dx = 0; dx < size; dx++) {
                const nx = cursorX + dx;
                const ny = cursorY + dy;
                if (nx >= mapSize || ny >= mapSize) continue;

                const ntile = mapData[ny][nx];

                undoBlock.push({
                    x: nx,
                    y: ny,
                    tile: {
                        ground: [...ntile.ground],
                        walkable: ntile.walkable,
                        spawn: ntile.spawn,
                        entities: [...ntile.entities.map(e => ({...e}))]
                    }
                });

                // cola os valores
                ntile.ground = [...clipboard.ground];
                ntile.walkable = clipboard.walkable;
                ntile.spawn = clipboard.spawn;
                ntile.entities = [...clipboard.entities.map(e => ({...e}))];
            }
        }
        undoStack.push(undoBlock);
        render();
        e.preventDefault();
        console.log("Colado");
    }

    // ------------------ DESFAZER ------------------
    if (ctrl && e.key.toLowerCase() === "z") {
        if (undoStack.length === 0) return;

        const lastAction = undoStack.pop();
        lastAction.forEach(a => {
            mapData[a.y][a.x] = {
                ground: [...a.tile.ground],
                walkable: a.tile.walkable,
                spawn: a.tile.spawn,
                entities: [...a.tile.entities.map(e => ({...e}))]
            };
        });
        render();
        e.preventDefault();
        console.log("Undo");
    }
  if (e.key === "ArrowUp") cursorY = Math.max(0, cursorY - 1);
  if (e.key === "ArrowDown") cursorY = Math.min(mapSize - 1, cursorY + 1);
  if (e.key === "ArrowLeft") cursorX = Math.max(0, cursorX - 1);
  if (e.key === "ArrowRight") cursorX = Math.min(mapSize - 1, cursorX + 1);
  if (e.key === "Delete") {
    const tile = mapData[cursorY][cursorX];
    tile.ground = [];
    tile.walkable = true;
    tile.spawn = null;
    tile.entities = [];
  }

  // Ajusta câmera para manter cursor visível
  if (cursorX < cameraX) cameraX = cursorX;
  if (cursorY < cameraY) cameraY = cursorY;
  if (cursorX >= cameraX + viewWidth) cameraX = cursorX - viewWidth + 1;
  if (cursorY >= cameraY + viewHeight) cameraY = cursorY - viewHeight + 1;

  render();
});


saveBtn.addEventListener("click", () => {
    let txt = "";
    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            const t = mapData[y][x];
            const s = t.ground.join(",");
            const w = t.walkable ? "S" : "N";
            const sp = t.spawn || t.entities.length > 0 ? `SPAWN(${t.entities.length > 0 ? t.entities[0].name : "POKEMON"})` : "";
            txt += `[${s},${w}${sp}] `;
        }
        txt += "\n";
    }

    // Caminho absoluto na mesma pasta do editor.js
    const mapPath = path.join(__dirname, "map.txt");

    fs.writeFile(mapPath, txt, (err) => {
        if (err) console.error("Erro ao salvar o mapa:", err);
        else console.log("Mapa salvo com sucesso em:", mapPath);
    });
});


// -------------------- INICIALIZA --------------------
async function initialize() {
    await loadMap("./map.txt"); // carrega o mapa e preenche mapData

    // Carrega todas as sprites para a lista lateral
    await loadSpritesPage(spritePage); // carrega a primeira página
    renderSpriteList();

    // Descobre todas as sprites usadas no mapa
    const spriteIds = new Set();
    for (let y = 0; y < mapSize; y++) {
        for (let x = 0; x < mapSize; x++) {
            // mapData[y][x].ground = mapData[y][x].ground.filter(id => sprites.has(id));
            mapData[y][x].ground.forEach(id => spriteIds.add(id));
        }
    }

    // Carrega apenas as sprites que existem no mapa
    const promises = [];
    spriteIds.forEach(id => {
        const img = new Image();
        img.src = `../assets/sprites/${id}.png`;
        const p = new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
        });
        promises.push(p);
        sprites.set(id, img);
    });

    await Promise.all(promises);
    render(); // renderiza só depois que todas imagens do mapa estiverem prontas
}

initialize();

