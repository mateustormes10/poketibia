import Renderer from "./renderer.js";
import MapLoader from "./map.js";
import Player from "./player.js";
import Input from "./input.js";
import Pokemon from "./pokemon.js";
import SkillEffect from "./SkillEffect.js";
import Inventory from "./inventory/Inventory.js";
import { TileActions } from "./TileActions.js";
import WsClient from "./websocket/WsClient.js";
import { SkillDatabase } from "./SkillDatabase.js";
export default class Game {
    constructor(canvas, token, characterIndex) {
        this.token = token;
        this.characterIndex = characterIndex;
        this.wsClient = new WsClient(this, "ws://localhost:8080", this.token);

        const nearbyPlayers = new Map(); // key = playerId, value = {sprite, position, name}


        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.tileSize = 64;
        this.updateViewDimensions();

        this.mapSize = 500;
        this.currentZ = 3; // térreo inicial


        this.renderer = new Renderer(this.ctx, this.tileSize, this.viewWidth, this.viewHeight, this);
        this.map = new MapLoader(this.mapSize);
        

        this.player = new Player(31, 25, "TormesBR"); // meio do mapa
        // Time de Pokémon (apenas exemplo)
        this.party = [
            { name: "Staryu", spriteId: 50001 },
            { name: "Pikachu", spriteId: 50020 }
        ];

        this.interaction = {
            open: false,
            tile: null,
            x: 0,
            y: 0,
            options: [],
            index: 0
        };

        this.messageBox = {
            text: "",
            visible: false,
            timer: 0
        };

        this.inventory = new Inventory(8, 4);

        this.activeFollower = null;

        // Cria a UI do menu
        this.createPokemonMenu();

        this.wildMons = [];
        this.input = new Input(this.canvas);


        // Posição da câmera, inicialmente igual à do player
        this.cameraX = this.player.x;
        this.cameraY = this.player.y;
    }

    showMessage(text, durationMs = 2000) {
        this.messageBox.text = text;
        this.messageBox.visible = true;
        this.messageBox.timer = durationMs;
    }


    // Método para atualizar a largura e altura da visualização com base no tamanho do canvas
    updateViewDimensions() {
        this.viewWidth = Math.ceil(this.canvas.width / this.tileSize);
        this.viewHeight = Math.ceil(this.canvas.height / this.tileSize);

        // Recriar o renderer após o redimensionamento
        this.renderer = new Renderer(this.ctx, this.tileSize, this.viewWidth, this.viewHeight, this);
    }

    createPokemonMenu() {
        const menu = document.createElement("div");
        menu.id = "pokeMenu";
        menu.style.position = "absolute";
        menu.style.top = "10px";
        menu.style.left = "10px";
        menu.style.background = "rgba(0,0,0,0.7)";
        menu.style.padding = "10px";
        menu.style.color = "white";
        menu.style.fontFamily = "sans-serif";
        menu.style.width = "150px";

        for (let mon of this.party) {
            const btn = document.createElement("div");
            btn.style.cursor = "pointer";
            btn.style.marginBottom = "8px";
            btn.style.padding = "4px";
            btn.style.border = "1px solid #999";

            btn.textContent = mon.name;

            btn.addEventListener("click", () => {
                if (this.activeFollower && this.activeFollower.name === mon.name) {
                    // clicar no mesmo → guardar
                    this.recallMon();
                } else {
                    this.summonMon(mon.name);
                }
            });

            menu.appendChild(btn);
        }

        document.body.appendChild(menu);
    }

    summonMon(name) {
        // Desativa seguidor atual
        this.activeFollower = null;

        // Cria um novo Pokémon seguidor
        this.activeFollower = new Pokemon(
            name,
            this.player.x,
            this.player.y + 1
        );

        this.activeFollower.isFollower = true;
    }
    recallMon() {
        this.activeFollower = null;
    }


    async start() {
        console.log("Carregando mapa:", `./assets/map_z${this.currentZ}.txt`);
         await this.map.load(`./assets/map_z${this.currentZ}.txt`);
        console.log("Mapa carregado!");

        // Conectar WebSocket
    try {
        await this.wsClient.connect();
        console.log("WebSocket conectado e autenticado!");
    } catch (err) {
        console.error("Falha ao conectar WebSocket:", err);
    }


        // Spawna Pokémons definidos no mapa
        this.spawnMonstersFromMap();
        this.loop();
    }

    spawnMonstersFromMap() {
        this.wildMons = [];

        for (let y = 0; y < this.map.size; y++) {
            for (let x = 0; x < this.map.size; x++) {
                const tile = this.map.grid[y][x];
                if (!tile || !tile.entities) continue;

                for (let ent of tile.entities) {
                    if (ent.type === "pokemon") {
                        const mon = new Pokemon(ent.name, x + 0.5, y + 0.5);
                        this.wildMons.push(mon);
                    }
                }
            }
        }
    }

    getNearbyInteractableTile() {
        const px = Math.floor(this.player.x);
        const py = Math.floor(this.player.y);

        const dirs = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 }
        ];

        for (const d of dirs) {
            const x = px + d.x;
            const y = py + d.y;
            const tile = this.map.getTile(x, y);
            if (!tile) continue;

            // 1️⃣ PRIORIDADE: OVERLAY (o que está na frente do player)
            if (tile.overlay && tile.overlay.length > 0) {
                const spriteId = Number(tile.overlay[tile.overlay.length - 1]);
                if (TileActions[spriteId]) {
                    const a = TileActions[spriteId];
                    if (a.look || a.use?.allowed) {
                        return { tile, x, y, spriteId };
                    }
                }
            }

            // 2️⃣ FALLBACK: GROUND
            if (tile.ground && tile.ground.length > 0) {
                const spriteId = Number(tile.ground[tile.ground.length - 1]);
                if (TileActions[spriteId]) {
                    const a = TileActions[spriteId];
                    if (a.look || a.use?.allowed) {
                        return { tile, x, y, spriteId };
                    }
                }
            }
        }

        return null;
    }



    createSkillMenu() {
        // contêiner único
        let existing = document.getElementById("skillMenu");
        if (existing) existing.remove();

        const menu = document.createElement("div");
        menu.id = "skillMenu";
        menu.style.position = "absolute";
        menu.style.bottom = "10px";
        menu.style.left = "10px";
        menu.style.background = "rgba(0,0,0,0.6)";
        menu.style.padding = "8px";
        menu.style.color = "white";
        menu.style.fontFamily = "sans-serif";
        menu.style.width = "260px";
        menu.style.display = "grid";
        menu.style.gridTemplateColumns = "repeat(3, 1fr)";
        menu.style.gap = "6px";
        document.body.appendChild(menu);

        this._skillMenuEl = menu;
    }

    updateSkillMenuUI() {
        if (!this._skillMenuEl) this.createSkillMenu();
        const menu = this._skillMenuEl;
        menu.innerHTML = ""; // limpa

        const follower = this.activeFollower;
        if (!follower) {
            // mostrar mensagem quando nenhum seguidor
            const msg = document.createElement("div");
            msg.style.gridColumn = "1 / -1";
            msg.textContent = "Nenhum Pokémon ativo";
            menu.appendChild(msg);
            return;
        }

        // para cada skill do follower, cria botão
        for (const skillName of (follower.skills || [])) {
            const skill = SkillDatabase[skillName];
            if (!skill) continue;

            const btn = document.createElement("button");
            btn.style.padding = "6px";
            btn.style.fontSize = "12px";
            btn.style.cursor = "pointer";
            btn.style.position = "relative";
            btn.textContent = skillName;

            // cooldown overlay
            const cd = follower.skillCooldowns[skillName] || 0;
            if (cd > 0) {
                btn.disabled = true;
                const overlay = document.createElement("div");
                overlay.style.position = "absolute";
                overlay.style.left = "0";
                overlay.style.top = "0";
                overlay.style.right = "0";
                overlay.style.bottom = "0";
                overlay.style.background = "rgba(0,0,0,0.6)";
                overlay.style.display = "flex";
                overlay.style.alignItems = "center";
                overlay.style.justifyContent = "center";
                overlay.style.color = "white";
                overlay.style.fontSize = "12px";
                overlay.textContent = (Math.ceil(cd / 1000)) + "s";
                btn.appendChild(overlay);
            } else if ((follower.mana || 0) < (skill.manaCost || 0)) {
                btn.disabled = true;
                btn.title = "Mana insuficiente";
            }

            btn.addEventListener("click", () => {
                // quando clicar, tenta usar skill
                this.attemptUseSkill(skillName);
            });

            menu.appendChild(btn);
        }
    }

    // retorna array de wildMons dentro das tiles listadas (centro em centerX,centerY)
    // skill.getAffectedTiles retorna tiles coords {x,y}
    _findTargetsForSkill(skill, centerX, centerY) {
        const tiles = skill.getAffectedTiles(Math.floor(centerX), Math.floor(centerY));
        const coordsKey = new Set(tiles.map(t => `${t.x},${t.y}`));

        // alvos dentre wildMons que estejam naquelas tiles (floor)
        const targets = [];
        for (const mon of this.wildMons) {
            const key = `${Math.floor(mon.x)},${Math.floor(mon.y)}`;
            if (coordsKey.has(key)) targets.push(mon);
        }
        return targets;
    }

    attemptUseSkill(skillName) {
        const follower = this.activeFollower;
        if (!follower) return;
        const skill = SkillDatabase[skillName];
        if (!skill) {
            console.warn("Skill não encontrada:", skillName);
            return;
        }

        // checa cooldown e mana
        const cdLeft = follower.skillCooldowns[skillName] || 0;
        if (cdLeft > 0) return; // ainda em CD

        const manaCost = skill.manaCost || 0;
        if ((follower.mana || 0) < manaCost) {
            console.log("Mana insuficiente");
            return;
        }

        // determina o centro do efeito (vamos usar a posição do follower como centro)
        const centerX = Math.floor(follower.x);
        const centerY = Math.floor(follower.y);

        // pega alvos
        const targets = this._findTargetsForSkill(skill, centerX, centerY);

        if (targets.length === 0) {
            // opcional: informar "nenhum alvo"
            console.log("Nenhum alvo na área da skill");
        }

        // =====================================
        // CRIA EFEITOS VISUAIS DA SKILL
        // =====================================
        const tiles = skill.getAffectedTiles(centerX, centerY);

        for (const t of tiles) {
            this.map.activeEffects.push(
                new SkillEffect(t.x, t.y, skill)
            );
        }

        // =====================================
        // EXECUTA A SKILL (DANO / HEAL / BUFF)
        // =====================================
        const results = skill.execute(follower, targets);

        // aplica custo de mana
        follower.mana = Math.max(0, (follower.mana || follower.maxMana || 0) - manaCost);

        // define cooldown (skill.cooldownMs ou default 2000ms)
        const cdMs = skill.cooldownMs ?? 2000;
        follower.setSkillCooldown(skillName, cdMs);

        // feedback: log e efeitos (você pode disparar partículas/FX aqui)
        console.log("Skill usada:", skillName, "result:", results);

        // Se algum alvo morreu, marque e trate (exemplo simples)
        for (const r of results) {
            if (
                r.type === "damage" &&
                r.target &&
                Number.isFinite(r.target.hp) &&
                r.target.hp <= 0
            ) {
                r.target.hp = 0;
                r.target.alive = false;

                const idx = this.wildMons.indexOf(r.target);
                if (idx >= 0) this.wildMons.splice(idx, 1);
            }

        }

        // atualiza UI
        this.updateSkillMenuUI();
    }


    useSkill(attacker, defender) {
        const skill = SkillDatabase["Choque do Trovão"];

        const tiles = skill.getAffectedTiles(defender.x, defender.y);

        const targets = [defender]; // sua seleção de inimigos

        const result = skill.execute(attacker, targets);

        console.log(result);
    }
    updateFollower() {
        if (!this.activeFollower) return;

        const fx = this.activeFollower.x;
        const fy = this.activeFollower.y;
        const px = this.player.x;
        const py = this.player.y;

        const speed = this.activeFollower.speed ?? 0.07;

        if (this._attackingWild && this.wildMons.includes(this._attackingWild)) {
            // Atacando Pokémon selvagem
            const dx = this._attackingWild.x - fx;
            const dy = this._attackingWild.y - fy;
            const distance = Math.hypot(dx, dy);

            // Se próximo, aplica dano
            if (distance <= 1.2) {
                const attackBase = this.activeFollower.attackBase || 1;
                const defenseBase = this._attackingWild.deffenseBase || 0;
                const damage = Math.max(1, attackBase - defenseBase);
                this._attackingWild.hp -= damage;

                // Se morrer, desativa ataque
                if (this._attackingWild.hp <= 0) {
                    const idx = this.wildMons.indexOf(this._attackingWild);
                    if (idx >= 0) this.wildMons.splice(idx, 1);
                    this._attackingWild = null;
                }
                return;
            }

            // Movimenta em direção ao alvo
            const nx = fx + (dx / distance) * speed;
            const ny = fy + (dy / distance) * speed;
            const tile = this.map.getTile(Math.floor(nx), Math.floor(ny));
            if (tile && tile.walkable !== false) {
                this.activeFollower.x = nx;
                this.activeFollower.y = ny;
                // define direção
                if (Math.abs(dx) > Math.abs(dy)) {
                    this.activeFollower.direction = dx > 0 ? "right" : "left";
                } else {
                    this.activeFollower.direction = dy > 0 ? "down" : "up";
                }
            }
        } else {
            // Segue o player normalmente
            const dx = px - fx;
            const dy = py - fy;
            const distance = Math.hypot(dx, dy);
            if (distance > 2) {
                const nx = fx + (dx / distance) * speed;
                const ny = fy + (dy / distance) * speed;
                const tile = this.map.getTile(Math.floor(nx), Math.floor(ny));
                if (tile && tile.walkable !== false) {
                    this.activeFollower.x = nx;
                    this.activeFollower.y = ny;
                    if (Math.abs(dx) > Math.abs(dy)) {
                        this.activeFollower.direction = dx > 0 ? "right" : "left";
                    } else {
                        this.activeFollower.direction = dy > 0 ? "down" : "up";
                    }
                }
            }
        }

        this.activeFollower.updateAnimation(0.016);
    }

    createNearbyMonMenu() {
        let menu = document.getElementById("nearbyMonMenu");
        if (!menu) {
            menu = document.createElement("div");
            menu.id = "nearbyMonMenu";
            menu.style.position = "absolute";
            menu.style.top = "10px";
            menu.style.right = "10px";
            menu.style.background = "rgba(0,0,0,0.7)";
            menu.style.padding = "10px";
            menu.style.color = "white";
            menu.style.fontFamily = "sans-serif";
            menu.style.width = "180px";
            document.body.appendChild(menu);
        }
        this._nearbyMonMenuEl = menu;
    }

    updateNearbyMonMenuUI() {
        if (!this._nearbyMonMenuEl) this.createNearbyMonMenu();
        const menu = this._nearbyMonMenuEl;
        menu.innerHTML = "";

        const px = this.player.x;
        const py = this.player.y;

        // Lista pokémons a até 20 tiles
        const nearby = this.wildMons.filter(m => {
            const dist = Math.hypot(m.x - px, m.y - py);
            return dist <= 20;
        });

        if (nearby.length === 0) {
            const msg = document.createElement("div");
            msg.textContent = "Nenhum Pokémon próximo";
            menu.appendChild(msg);
            return;
        }

        for (const mon of nearby) {
            const btn = document.createElement("div");
            btn.style.padding = "4px";
            btn.style.marginBottom = "4px";
            btn.style.cursor = "pointer";
            btn.style.border = "1px solid #999";
            btn.textContent = `${mon.name} (HP: ${Math.floor(mon.hp)})`;

            btn.oncontextmenu = (e) => {
                e.preventDefault();
                // Seleciona para atacar
                this._attackingWild = mon;
            };

            menu.appendChild(btn);
        }
    }

    handleInventoryInput() {
        const m = this.input.mouse;

        if (m.released) {
            this.inventory.handleClick(m.x, m.y);
        }
    }

    loop() {
        requestAnimationFrame(() => this.loop());
        this.updateFollower();
        this.updateNearbyMonMenuUI();

        if (this.input.isDown("i") && !this._invPressed) {
            this.inventory.toggle();
            this._invPressed = true;
        }


        if (!this.input.isDown("i")) {
            this._invPressed = false;
        }

        if (this.inventory.visible) {
            this.handleInventoryInput();
        }

        // Envia posição atual para o servidor (ex.: a cada 100ms)
if (this.wsClient.playerId) {
    this.wsClient.move(this.player.x, this.player.y, this.currentZ);
}








        // delta ms aproximado entre frames
        let nowTs = performance.now();
        this._lastLoopTime = this._lastLoopTime || nowTs;
        const deltaMs = Math.min(200, nowTs - this._lastLoopTime);
        this._lastLoopTime = nowTs;

        
        // atualiza efeitos de skills
        this.map.updateEffects(deltaMs);
        this.player.updateAnimation(deltaMs / 1000);


        // tick cooldowns do follower (se existir)
        if (this.activeFollower) this.activeFollower.tickCooldowns(deltaMs);

        // também tick nos wildMons individuais (se usar as skills neles)
        for (const m of this.wildMons) {
            if (typeof m.tickCooldowns === "function") m.tickCooldowns(deltaMs);
        }

        // atualiza a UI do menu periodicamente (ex.: 6x por segundo)
        // evita redesenhar DOM toda hora se preferir otimizar
        this._uiAcc = (this._uiAcc || 0) + deltaMs;
        if (this._uiAcc >= 150) {
            this.updateSkillMenuUI();
            this._uiAcc = 0;
        }

        if (!this.interaction.open && this.input.isDown("v") && !this._vPressed) {
            const found = this.getNearbyInteractableTile();
            if (found) {
                this.openInteractionMenu(found);
            }
            this._vPressed = true;
        }
        if (!this.input.isDown("v")) this._vPressed = false;
        this.updateInteractionMenu();
        if (this.messageBox.visible) {
            this.messageBox.timer -= deltaMs;
            if (this.messageBox.timer <= 0) {
                this.messageBox.visible = false;
                this.messageBox.text = "";
            }
        }
this.updateTileIdleAnimations(deltaMs);

        // Atualiza a posição do jogador e checa ações especiais
        if (!this.interaction.open) {
            const result = this.player.update(this.input, this.map, this.wildMons, this.activeFollower, this.currentZ);

            // após update do player
            this.checkTileTriggers();

            if (result && result.action === "CHANGE_FLOOR") {
            const targetZ = result.targetZ;

            let spawnX = this.player.x;
            let spawnY = this.player.y;

            for (let y = 0; y < this.map.size; y++) {
                for (let x = 0; x < this.map.size; x++) {
                    const t = this.map.getTile(x, y);
                    if (!t) continue;

                    // Se for o novo andar e tiver escada voltando para o andar anterior
                    if ((t.up === this.currentZ && targetZ > this.currentZ) || 
                        (t.down === this.currentZ && targetZ < this.currentZ)) {
                        spawnX = x;
                        spawnY = y;
                        break;
                    }
                }
            }

            this.loadMap(targetZ, spawnX, spawnY);
        }
        }

        



        // Movimentação limitada dos Pokémons (a cada 2 segundos)
        const now = performance.now();
        if (!this._lastAi || now - this._lastAi > 200) {
            for (let mon of this.wildMons) {
                mon.updateAI(this.map, 0.01);
            }
            this._lastAi = now;
        }

        // Atualiza a posição da câmera (centra a visão no jogador)
        this.cameraX = Math.floor(
            Math.max(0, Math.min(this.player.x - Math.floor(this.viewWidth / 2), this.mapSize - this.viewWidth))
        );

        this.cameraY = Math.floor(
            Math.max(0, Math.min(this.player.y - Math.floor(this.viewHeight / 2), this.mapSize - this.viewHeight))
        );

        // Renderização com base na posição da câmera
        this.renderer.draw(this.map, this.player, this.wildMons,this.activeFollower,this.inventory,this.interaction,this.messageBox, this.cameraX, this.cameraY,this.wsClient.otherPlayers);
    }


    openInteractionMenu(found) {
        const action = TileActions[found.spriteId];
        if (!action) return;

        const options = [];
        if (action.look) options.push("Olhar");
        if (action.use?.allowed) options.push("Usar");

        // 🔒 REGRA FINAL: se não tem opção, nem abre
        if (options.length === 0) return;

        this.interaction.open = true;
        this.interaction.tile = found.tile;
        this.interaction.x = found.x;
        this.interaction.y = found.y;
        this.interaction.spriteId = found.spriteId; // 🔹 ESSENCIAL
        this.interaction.index = 0;
        this.interaction.options = options;
    }

    executeInteraction() {
        const option = this.interaction.options[this.interaction.index];
        const { x, y, tile, spriteId } = this.interaction;

        const action = TileActions[spriteId];
        if (!action) {
            this.closeInteractionMenu();
            return;
        }

        const layer = action.layer || "ground";

        if (option === "Olhar" && typeof action.look === "function") {
            this.showMessage(action.look(tile));
        }

        if (option === "Usar" && action.use?.onUse) {

            // 🔹 EXECUTA ANIMAÇÃO AUTOMÁTICA
            if (Array.isArray(action.use.animationSprites)) {
                this.animateTileSprite(
                    tile,
                    layer,
                    action.use.animationSprites,
                    180 // ms entre frames
                );
            }

            // 🔹 EXECUTA A LÓGICA DO TILE
            action.use.onUse(this, x, y);
        }

        this.closeInteractionMenu();
    }


    animateTileSprite(tile, layer, frames, interval = 200) {
        if (!frames || frames.length === 0) return;

        let i = 0;

        const applyFrame = () => {
            tile[layer][tile[layer].length - 1] = frames[i];
            i++;

            if (i < frames.length) {
                setTimeout(applyFrame, interval);
            }
        };

        applyFrame();
    }


    closeInteractionMenu() {
        this.interaction.open = false;
        this.interaction.tile = null;
        this.interaction.options = [];
        this.interaction.index = 0;
    }
updateTileIdleAnimations(deltaMs) {
    const px = Math.floor(this.player.x);
    const py = Math.floor(this.player.y);

    this._tileAnimTimers ??= {};

    // define range máximo possível
    const maxCheckRange = 20; // ou outro valor que faça sentido
    for (let y = py - maxCheckRange; y <= py + maxCheckRange; y++) {
        for (let x = px - maxCheckRange; x <= px + maxCheckRange; x++) {

            const tile = this.map.getTile(x, y);
            if (!tile) continue;

            const ids = [...tile.ground, ...(tile.overlay || [])];

            for (const id of ids) {
                // acha ação
                let action = TileActions[id];
                if (!action) {
                    for (const baseId in TileActions) {
                        const anim = TileActions[baseId]?.idleAnimation;
                        if (anim && anim.frames.includes(id)) {
                            action = TileActions[baseId];
                            break;
                        }
                    }
                }

                const anim = action?.idleAnimation;
                if (!anim) continue;

                // usa o range da animação ou padrão
                const range = anim.range ?? 2;
                const dist = Math.hypot(px - x, py - y);
                if (dist > range) continue;

                const key = `${x},${y},${id}`;
                const timer = this._tileAnimTimers[key] ?? 0;
                const now = performance.now();
                if (now - timer < anim.interval) continue;
                this._tileAnimTimers[key] = now;

                const layer = action.layer || "ground";
                const arr = tile[layer];
                const idx = arr.lastIndexOf(id);
                if (idx === -1) continue;

                const frames = anim.frames;
                const current = frames.indexOf(id);
                const next = frames[(current + 1) % frames.length];

                arr[idx] = next;
            }
        }
    }
}



    handleTileInteraction(tile, x, y) {
        if (!tile || !tile.ground || tile.ground.length === 0) return;

        // pega o sprite do topo
        const spriteId = Number(tile.ground[tile.ground.length - 1]);
        const action = TileActions[spriteId];
        if (!action) return;

        // LOOK
        if (action.look) {
            console.log(action.look(tile));
        }

        // USE
        if (action.use?.allowed) {
            this.useTile(spriteId, action, x, y);
        }
    }

    updateInteractionMenu() {
        if (!this.interaction.open) return;

        if (this.input.isDown("ArrowUp") && !this._menuUp) {
            this.interaction.index =
                (this.interaction.index - 1 + this.interaction.options.length) %
                this.interaction.options.length;
            this._menuUp = true;
        }
        if (!this.input.isDown("ArrowUp")) this._menuUp = false;

        if (this.input.isDown("ArrowDown") && !this._menuDown) {
            this.interaction.index =
                (this.interaction.index + 1) %
                this.interaction.options.length;
            this._menuDown = true;
        }
        if (!this.input.isDown("ArrowDown")) this._menuDown = false;

        if (this.input.isDown("Enter") && !this._menuEnter) {
            this.executeInteraction();
            this._menuEnter = true;
        }
        if (!this.input.isDown("Enter")) this._menuEnter = false;

        if (this.input.isDown("Escape")) {
            this.closeInteractionMenu();
        }
    }

    
    async loadMap(level, spawnX = 31, spawnY = 25) {
        console.log("Carregando mapa z" + level);

        this.currentZ = level;

        // Carrega o txt pelo MapLoader
        await this.map.load(`./assets/map_z${level}.txt`);
        console.log("Mapa carregado!");

        // Respawna monstros
        this.spawnMonstersFromMap();

        // Reposiciona o player no spawn
        this.player.x = spawnX;
        this.player.y = spawnY;

        if (this.activeFollower) {
            this.activeFollower.x = spawnX;
            this.activeFollower.y = spawnY + 1;
        }

        // 🔹 Atualiza câmera para o player
        this.cameraX = Math.floor(
            Math.max(0, Math.min(this.player.x - Math.floor(this.viewWidth / 2), this.mapSize - this.viewWidth))
        );
        this.cameraY = Math.floor(
            Math.max(0, Math.min(this.player.y - Math.floor(this.viewHeight / 2), this.mapSize - this.viewHeight))
        );

        // 🔹 Força render imediato
        this.renderer.draw(this.map, this.player, this.wildMons, this.activeFollower, this.inventory,  this.interaction,this.messageBox,this.cameraX, this.cameraY);
    }

    checkTileTriggers() {
        const px = Math.floor(this.player.x);
        const py = Math.floor(this.player.y);

        const tile = this.map.getTile(px, py);
        if (!tile) return;

        // verifica GROUND
        const ids = [...tile.ground, ...(tile.overlay || [])];

        for (const id of ids) {
            const action = TileActions[id];
            if (!action) continue;

            // 🔹 PORTAL
            if (action.teleportTo) {
                const [tx, ty, tz] = action.teleportTo;

                // evita loop infinito
                if (this._teleportLock) return;
                this._teleportLock = true;

                this.loadMap(tz, tx, ty);

                // libera o lock após pequeno delay
                setTimeout(() => {
                    this._teleportLock = false;
                }, 300);

                return;
            }
        }
    }


}
