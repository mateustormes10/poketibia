const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
const spriteListDiv = document.getElementById("sprite-list");
const walkableCheckbox = document.getElementById("walkable");
const spawnCheckbox = document.getElementById("spawn");
const saveBtn = document.getElementById("saveBtn");
const prevSpritesBtn = document.getElementById("prevSprites");
const nextSpritesBtn = document.getElementById("nextSprites");

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

// Inicializa matriz
for (let y = 0; y < mapSize; y++) {
  mapData[y] = [];
  for (let x = 0; x < mapSize; x++) {
    mapData[y][x] = { ground: [], walkable: true, spawn: null, entities: [] };
  }
}

// -------------------- CARREGAR SPRITES --------------------

async function loadSprites(total = 1000) {
    const promises = [];

    for (let i = 1; i <= total; i++) {
        const img = new Image();
        img.src = `../assets/sprites/${i}.png`;

        // Cria uma promise que resolve quando a imagem carrega
        const p = new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve; // mesmo se não carregar, resolve para não travar
        });

        promises.push(p);
        sprites.set(i, img);
    }

    // Espera todas as imagens carregarem
    await Promise.all(promises);
}


const spawnNameInput = document.getElementById("spawnName");

spawnCheckbox.addEventListener("change", () => {
    spawnNameInput.disabled = !spawnCheckbox.checked;
});

canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left)/tileSize) + cameraX;
    const y = Math.floor((e.clientY - rect.top)/tileSize) + cameraY;
    const tile = mapData[y][x];

    if(selectedSpriteId) {
        if(!tile.ground.includes(selectedSpriteId)) tile.ground.push(selectedSpriteId);
    }

    tile.walkable = walkableCheckbox.checked;
    tile.spawn = spawnCheckbox.checked ? spawnNameInput.value.trim() : null;

    cursorX = x; cursorY = y;
    render();
});


// -------------------- RENDERIZAÇÃO DA LISTA DE SPRITES --------------------
function renderSpriteList() {
  spriteListDiv.innerHTML = '';
  const start = spritePage * spritesPerPage + 1;
  const end = Math.min(start + spritesPerPage - 1, sprites.size);
  for (let i = start; i <= end; i++) {
    const img = sprites.get(i);
    if (!img) continue;
    const div = document.createElement("img");
    div.src = img.src;
    div.title = i;
    div.addEventListener("click", () => {
      document.querySelectorAll(".sprite").forEach(s => s.classList.remove("selected"));
      div.classList.add("selected");
      selectedSpriteId = i;
    });
    spriteListDiv.appendChild(div);
  }
}

// Navegação de páginas
prevSpritesBtn.addEventListener("click", () => {
  if (spritePage > 0) spritePage--;
  renderSpriteList();
});
nextSpritesBtn.addEventListener("click", () => {
  if ((spritePage + 1) * spritesPerPage < sprites.size) spritePage++;
  renderSpriteList();
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
  tile.spawn = spawnCheckbox.checked ? "POKEMON" : null;

  cursorX = x; cursorY = y;
  render();
});

// -------------------- TECLADO --------------------
document.addEventListener("keydown", (e) => {
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

// -------------------- SALVAR MAP --------------------
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
  const blob = new Blob([txt], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "map.txt";
  a.click();
});

// -------------------- INICIALIZA --------------------
async function initialize() {
    await loadMap("./map.txt"); // carrega o mapa e preenche mapData

    // Carrega todas as sprites para a lista lateral
    await loadSprites(1000);

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
    renderSpriteList(); // atualiza o painel lateral
    render(); // renderiza só depois que todas imagens do mapa estiverem prontas
}

initialize();

