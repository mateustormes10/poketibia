import Renderer from "./renderer.js";
import MapLoader from "./map.js";
import Player from "./player.js";
import Input from "./input.js";
import Pokemon from "./pokemon.js";
import SkillEffect from "./SkillEffect.js";
import Inventory from "./inventory/Inventory.js";

import { SkillDatabase } from "./SkillDatabase.js";
export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.tileSize = 64;
        this.updateViewDimensions();

        this.mapSize = 500;

        this.renderer = new Renderer(this.ctx, this.tileSize, this.viewWidth, this.viewHeight);
        this.map = new MapLoader(this.mapSize);
        

        this.player = new Player(31, 25, "TormesBR"); // meio do mapa
        // Time de Pokémon (apenas exemplo)
        this.party = [
            { name: "Staryu", spriteId: 50001 },
            { name: "Pikachu", spriteId: 50020 }
        ];
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

    // Método para atualizar a largura e altura da visualização com base no tamanho do canvas
    updateViewDimensions() {
        this.viewWidth = Math.ceil(this.canvas.width / this.tileSize);
        this.viewHeight = Math.ceil(this.canvas.height / this.tileSize);

        // Recriar o renderer após o redimensionamento
        this.renderer = new Renderer(this.ctx, this.tileSize, this.viewWidth, this.viewHeight);
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
        await this.map.load("./assets/map.txt");

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



        // Atualiza a posição do jogador
        this.player.update(this.input, this.map);

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
        this.renderer.draw(this.map, this.player, this.wildMons,this.activeFollower,this.inventory, this.cameraX, this.cameraY);
    }
}
