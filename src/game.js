import PlayerEntity from "./player.js";
import { getTileAt as mapGetTileAt, computeMapOrigin } from "./map.js";
import Renderer from "./renderer.js";
import { getSpriteRows } from "./spriteService.js"; // << adiciona import
import UI from "./ui.js";
import Pokemon from "./pokemon.js";
import { TileActions } from "./TileActions.js";
import { CaptureSystem } from "./capture.js";
import { ChatSystem, ChatUI } from "./ChatSystem.js";
import PokemonSkillsUI from "./PokemonSkillsUI.js";

export default class Game {
    constructor(canvas, token, characterData) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.token = token;
        this.characterData = characterData;

        this.ws = null;
        this.player = null;
        this.otherPlayers = {};
        this.mapNearby = [];
        this.wildPokemons = [];
        this.wildEntities = []; // instâncias de Pokemon para render/anim
        this.deadPokemonBodies = []; // Sprites de pokémons mortos (corpo)

        this.loadedImages = {}; // <<< inicializa aqui
        this.imagesPreloaded = false;
        this.tileSize = 64; // tamanho padrão do tile
        this.mapOrigin = { x: 0, y: 0 }; // << guarda origem do chunk (coord global do tile [0,0])
        this.playerEntity = new PlayerEntity();
        // define viewport fixa 20x20 para zoom maior
        this.renderer = new Renderer(this.ctx, this.canvas, this, 20, 20);
        this.ui = new UI(this);

        // === Chat System ===
        this.chatSystem = new ChatSystem(this);
        this.chatUI = new ChatUI(this, canvas);
        
        // === Pokemon Skills UI ===
        this.pokemonSkillsUI = new PokemonSkillsUI(this);
        this.selectedSkill = null;

        this._lastFrameTime = performance.now();
        this._lastTeleportAt = 0; // throttle para evitar teleports em loop
        this._lastFloorTransitionAt = 0;
        this.floorTransitionsEnabled = false; // desativa UP/DOWN por enquanto
        // ajusta canvas para ocupar toda a janela imediatamente (como em main.js)
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // adicional: mantém estilo full-viewport
        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100vh";

        // reagir a resize: atualiza tamanho (igual main.js) e re-renderiza
        window.addEventListener("resize", () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.resizeCanvas();
        });

        // mouse click -> UI
        this.canvas.addEventListener("click", (ev) => {
            const rect = this.canvas.getBoundingClientRect();
            const cx = ev.clientX - rect.left;
            const cy = ev.clientY - rect.top;
            // Primeiro verifica botão do chat
            if (this.chatUI.handleButtonClick(cx, cy)) return;
            if (this.ui.handleClickFull(cx, cy)) return;
            // ...nova lógica: tentar clicar em wild pokemon...
            this.tryClickWildPokemon(cx, cy);
        });

        console.log("Game inicializado");
    }
    start() {
        console.log("Iniciando conexão com o servidor...");
        this.connectToServer()
            .then(() => {
                console.log("Conectado ao servidor com sucesso!");
                this.addKeyboardControls(); // adiciona controles
                // Aguarda um pouco para garantir que dados iniciais foram recebidos e sprites carregadas
                setTimeout(() => {
                    console.log("Iniciando loop de renderização...");
                    this.loop();
                }, 200);
            })
            .catch(err => {
                console.error("Erro ao conectar:", err);
            });
    }

    // ===== Helpers privados para reduzir duplicações =====
    _applyServerSnapshot(data) {
        if (!data) return;
        this.player = data;
        this.otherPlayers = data.nearbyPlayers || {};
        this.mapNearby = data.mapNearbyPlayer || [];
        this.wildPokemons = data.wildPokemonsNearbyPlayer || [];
        try {
            delete this.otherPlayers[this.player.id];
            delete this.otherPlayers[String(this.player.id)];
        } catch (e) {}
        this._updateOriginAndPlayerEntity();
        this._loadPlayerSpriteFromState();
        // Precarrega imagens das sprites do player
        this.preloadMapImages().catch(() => {});
    }

    _updateOriginAndPlayerEntity() {
        // calcula origem do chunk com utilitário e posiciona player no centro
        const origin = computeMapOrigin(this.mapNearby, this.player.position.x, this.player.position.y);
        this.mapOrigin = origin;
        this.playerEntity.setPositionCenter(this.mapNearby, this.mapOrigin, this.player.position.z);
    }

    // Converte direction numérica do servidor para string
    _convertDirection(dir) {
        if (typeof dir === 'string') return dir;
        // Conversão do servidor: 0=down, 1=left, 2=up, 3=right (ou similar)
        const dirMap = {
            0: 'down',
            1: 'left', 
            2: 'up',
            3: 'right'
        };
        return dirMap[dir] || 'down';
    }
    
    // Calcula posição do follower (2 tiles atrás do player baseado na direção)
    getFollowerPosition(playerX, playerY, playerDirection) {
        let followerX = playerX;
        let followerY = playerY;
        
        const dir = this._convertDirection(playerDirection);
        
        switch(dir) {
            case 'up':
                followerY = playerY + 2; // Pokémon fica 2 tiles abaixo quando player olha pra cima
                break;
            case 'down':
                followerY = playerY - 2; // Pokémon fica 2 tiles acima quando player olha pra baixo
                break;
            case 'left':
                followerX = playerX + 2; // Pokémon fica 2 tiles à direita quando player olha pra esquerda
                break;
            case 'right':
                followerX = playerX - 2; // Pokémon fica 2 tiles à esquerda quando player olha pra direita
                break;
        }
        
        return { x: followerX, y: followerY };
    }

    _loadPlayerSpriteFromState() {
        const spriteType = this.player?.sprite || this.characterData?.sprite || "default";
        const dirRaw = this.player?.direction ?? this.characterData?.direction ?? "down";
        const dir = this._convertDirection(dirRaw);
        
        try {
            this.playerEntity.loadSprite(spriteType, dir); // valida internamente
            this.playerEntity.direction = dir; // força a direção
        } catch (e) {
            console.error("Erro ao carregar sprite:", e);
        }
        
        // nome e vida (fallback para characterData se player não tiver)
        try {
            this.playerEntity.name = this.player?.name || this.characterData?.name || "";
            this.playerEntity.hp = Number(this.player?.hp ?? this.player?.hpCurrent ?? 100);
            this.playerEntity.maxHp = Number(this.player?.maxHp ?? this.player?.hpMax ?? 100);
        } catch (e) {
            this.playerEntity.name = this.characterData?.name || "";
            this.playerEntity.hp = 100;
            this.playerEntity.maxHp = 100;
        }
    }

    _resolveTileAction(tileStr) {
        if (!tileStr) return null;
        const parts = String(tileStr).replace(/\[|\]/g, "").split(",").map(s => String(s).trim()).filter(Boolean);
        const numeric = parts.filter(p => /^\d+$/.test(p));
        for (let i = numeric.length - 1; i >= 0; i--) {
            const id = numeric[i];
            const a = TileActions?.[id];
            if (a) return a; // prioriza overlay/último id
        }
        return null;
    }

    addKeyboardControls() {
        document.addEventListener("keydown", (e) => {
            // === PRIORIDADE: SPRITE SELECTOR ===
            // If sprite menu open -> navigation and selection handled here
            if (this.ui.spriteMenuOpen) {
                if (e.key.toLowerCase() === "d") this.ui.nextSprite();
                if (e.key.toLowerCase() === "a") this.ui.prevSprite();
                if (e.key === "ArrowUp") this.ui.setDirection("up");
                if (e.key === "ArrowDown") this.ui.setDirection("down");
                if (e.key === "ArrowLeft") this.ui.setDirection("left");
                if (e.key === "ArrowRight") this.ui.setDirection("right");
                if (e.key === "Enter") {
                    const chosen = this.ui.getSpriteType();
                    const chosenDir = this.ui.spriteDirection;
                    
                    // apply locally
                    try { 
                        this.playerEntity.setSpriteType(chosen, chosenDir);
                        this.playerEntity.animIndex = 0;
                        this.playerEntity.isMoving = false;
                    } catch (e) {}
                    
                    // Precarrega as sprites da nova escolha antes de enviar ao servidor
                    this.preloadPlayerSprites().then(() => {
                        // Renderiza várias vezes para garantir
                        this.renderMapImmediate();
                        setTimeout(() => this.renderMapImmediate(), 50);
                        setTimeout(() => this.renderMapImmediate(), 100);
                    }).catch(() => {});
                    
                    // send to server
                    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                        this.ws.send(JSON.stringify({
                            action: "updateSprite",
                            playerId: this.characterData.id,
                            payload: { sprite: chosen }
                        }));
                    }
                    this.ui.spriteMenuOpen = false;
                }
                if (e.key === "Escape" || e.key.toLowerCase() === "c") {
                    this.ui.spriteMenuOpen = false;
                }
                return;
            }

            // === CHAT INPUT (somente se chat estiver aberto) ===
            if (this.chatUI.inputActive && this.chatUI.isOpen) {
                if (e.key === "Escape") {
                    this.chatUI.toggleInput();
                    return;
                }
                this.chatUI.handleInput(e.key);
                return;
            }

            // === TOGGLE CHAT INPUT (somente se chat estiver aberto) ===
            if (e.key === "Enter" && this.chatUI.isOpen && !this.ui.spriteMenuOpen) {
                this.chatUI.toggleInput();
                return;
            }

            // UI: toggle ESC menu
            if (e.key === "Escape") {
                this.ui.menuOpen = !this.ui.menuOpen;
                if (this.ui.menuOpen) this.ui.spriteMenuOpen = false;
                return;
            }

            // UI: toggle sprite menu (C) via toggle method (preloads preview)
            if (e.key.toLowerCase() === "c") {
                this.ui.toggleSpriteMenu();
                // Quando abre sprite selector, fecha o chat input se estiver ativo
                if (this.ui.spriteMenuOpen && this.chatUI.inputActive) {
                    this.chatUI.inputActive = false;
                    this.chatUI.inputText = "";
                }
                return;
            }
            
            // UI: toggle Pokemon Skills UI (K)
            if (e.key.toLowerCase() === "k") {
                // Busca primeiro pokemon do player
                const myPokemon = (this.wildEntities || []).find(p => 
                    p.ownerId && String(p.ownerId) === String(this.player?.id)
                );
                
                if (myPokemon) {
                    this.pokemonSkillsUI.toggle(myPokemon);
                } else {
                    console.log("[Game] Nenhum pokemon encontrado");
                }
                return;
            }
            
            // Spawn wild Pokemon (P) - para testes
            if (e.key.toLowerCase() === "p") {
                if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                    this.ws.send(JSON.stringify({
                        action: "spawnWildPokemon",
                        playerId: this.characterData.id
                    }));
                    console.log("🌿 Spawning wild Pokemon...");
                }
                return;
            }
            
            // Ataca pokémon selvagem mais próximo (ESPAÇO)
            if (e.key === " ") {
                this.attackNearestWildPokemon();
                return;
            }

            // ESC menu keyboard: Enter activates close game button
            if (this.ui.menuOpen) {
                if (e.key === "Enter") {
                    // trigger same action as clicking close button
                    try { this.ui.handleCenterClick(this.ui._closeBtn.x + 1, this.ui._closeBtn.y + 1); } catch (err) {}
                }
                return;
            }

            // Movement and game controls require player present
            if (!this.player) return;

            let newX = this.player.position.x;
            let newY = this.player.position.y;
            let direction = "down";

            switch (e.key) {
                case "ArrowUp":
                    newY -= 1;
                    direction = "up";
                    break;
                case "ArrowDown":
                    newY += 1;
                    direction = "down";
                    break;
                case "ArrowLeft":
                    newX -= 1;
                    direction = "left";
                    break;
                case "ArrowRight":
                    newX += 1;
                    direction = "right";
                    break;
                default:
                    return; // tecla não relevante
            }

            this.tryMovePlayer(newX, newY, direction);
        });
    }
    tryMovePlayer(newX, newY, direction) {
		// usa função utilitária para checar tile
		const tileStr = mapGetTileAt(this.mapNearby, this.mapOrigin, newX, newY);
		if (!tileStr) return;
		// parser mais robusto (trim e uppercase)
		const tileParts = tileStr.replace(/\[|\]/g, "").split(",").map(s => String(s).trim().toUpperCase());
		const passable = (tileParts[tileParts.length - 1] === "S");
		if (!passable) return;
		
		// Verifica colisão com pokemon
		for (const pokemon of (this.wildEntities || [])) {
			const px = pokemon.position?.x ?? pokemon.x;
			const py = pokemon.position?.y ?? pokemon.y;
			if (px === newX && py === newY) {
				return; // Bloqueado por pokemon
			}
		}
		
		// Verifica colisão com outros players
		for (const otherPlayer of Object.values(this.otherPlayers || {})) {
			const ox = otherPlayer.position?.x ?? otherPlayer.x;
			const oy = otherPlayer.position?.y ?? otherPlayer.y;
			if (ox === newX && oy === newY) {
				return; // Bloqueado por outro player
			}
		}

		// prepara sprite/direção local antes de animar
		const serverSpriteType = (this.player && this.player.sprite) ? this.player.sprite : (this.characterData?.sprite || "default");
	const serverDirectionRaw = direction || (this.player && this.player.direction) || "down";
	const serverDirection = this._convertDirection(serverDirectionRaw);
	try {
		// carrega rows localmente (rápido, síncrono a partir da lista)
		} catch (e) {}

		// limpa qualquer timeout anterior e inicia animação local
		try { 
			if (this.playerEntity.moveTimeout) { clearTimeout(this.playerEntity.moveTimeout); this.playerEntity.moveTimeout = null; }
			this.playerEntity.isMoving = true;
			this.playerEntity.animTimer = 0;
			this.playerEntity.animIndex = 0;
		} catch (e) {}

		this.movePlayerAndUpdateMap(newX, newY, this.player.position.z, direction)
			.then((updatedData) => {
				// aplica snapshot e redesenha
				this._applyServerSnapshot(updatedData);
				this.preloadMapImages().then(() => { this.renderMapImmediate(); }).catch(() => {});
			})
			.catch(err => console.error("Erro ao mover player:", err));
	}

    getTileAt(x, y) {
        if (!this.mapNearby || !this.mapNearby.length) return null;
        // converte coordenada global para índice local usando mapOrigin
        const localX = x - (this.mapOrigin.x ?? 0);
        const localY = y - (this.mapOrigin.y ?? 0);
        if (localX < 0 || localX >= this.mapNearby[0]?.length) return null;
        if (localY < 0 || localY >= this.mapNearby.length) return null;
        return this.mapNearby[localY][localX] || null;
    }

    async mergeMapNearby(newChunk, playerX, playerY) {
        // Atualiza o mapNearby
        // Substitui o chunk inteiro (mais simples) e calcula origem baseado na posição do player
        this.mapNearby = newChunk.map(row => row.slice());

        // calcula origem: assume que o player está no centro do chunk
        const centerX = Math.floor((this.mapNearby[0]?.length || 0) / 2);
        const centerY = Math.floor((this.mapNearby.length || 0) / 2);
        this.mapOrigin = {
            x: playerX - centerX,
            y: playerY - centerY
        };

        // Preload das imagens novas (somente se não tiver carregado)
        await this.preloadMapImages();

        // Redesenha imediatamente
        this.imagesPreloaded = true;
        this.renderMap();
    }


    logGeralGame() {
        console.log(" -------  LOG -------- ");

        console.log("Players :");
        console.log(this.player);
        console.log("Others Players :");
        console.log(this.otherPlayers);
        console.log("Mapa Proximo Palyer :");
        console.log(this.mapNearby);


        console.log(" ------- XXXX -------- ");
    }

    connectToServer() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket("ws://localhost:8080");

            this.ws.onopen = () => {
                console.log("[WS] Conectado ao servidor");

                // Envia ação de connect
                this.ws.send(JSON.stringify({
                    action: "connect",
                    playerId: this.characterData.id,
                    payload: {
                        name: this.characterData.name,
                        level: this.characterData.level || 1,
                        direction: this.characterData.direction || "down",
                        speed: this.characterData.speed || 1,
                        sprite: this.characterData.sprite || "summonerMale",
                        position: {
                            x: this.characterData.posx,
                            y: this.characterData.posy,
                            z: this.characterData.posz
                        },
                        pokemons: this.characterData.activePokemons?.map((p, i) => ({
                            id: `p${i + 1}`,
                            name: p.name,
                            x: this.characterData.posx,
                            y: this.characterData.posy,
                            direction: p.direction || "down",
                            sprite: p.sprite_down || "[0]"
                        })) || []
                    }
                }));

                resolve();
            };

            // usa addEventListener para garantir que o listener seja chamado mesmo se outros listeners temporários existirem
            this.ws.addEventListener("message", (event) => {
                let msg;
                try { msg = JSON.parse(event.data); } catch (e) { return; }

                // resposta inicial com dados do próprio player
                if (msg.action === "playerConnected") {
                     this.updateStatusConnected(msg.data);
                     return;
                 }
 
                 // resposta ao mover (destinada ao cliente que moveu)
                 if (msg.action === "playerMoved") {
                     this.updateStatusMoved(msg.data);
                     return;
                 }
 
                // confirmação de troca de sprite feita pelo servidor
                if (msg.action === "updateSpriteOk") {
                    try {
                        const newSprite = msg.sprite;
                        if (newSprite && this.player) {
                            this.player.sprite = newSprite;
                        }
                    } catch (e) {}
                    return;
                }

                 // broadcast de movimento de outro jogador (chega quando outro cliente se move)
                 if (msg.action === "playerBroadcastMoved" && msg.player) {
                    const p = msg.player;
                    // atualiza/insere otherPlayers mantendo estrutura esperada
                    const op = this.otherPlayers[p.id] = this.otherPlayers[p.id] || {};
                    op.id = p.id;
                    op.name = p.name;
                    op.position = p.position;
                    op.direction = this._convertDirection(p.direction); // converte direction
                    op.sprite = p.sprite;
                    op.level = p.level;

                    // se veio info do pokemon ativo, garante que existe na lista
                    try {
                        const ap = p.activePokemon;
                        if (ap) {
                            // Procura pokémon follower existente
                            let follower = this.wildEntities.find(w => 
                                String(w.ownerId) === String(p.id)
                            );
                            
                            if (!follower) {
                                // Cria follower uma única vez
                                const followerData = {
                                    id: `${p.id}_pokemon_active`,
                                    name: ap.name,
                                    sprite: ap.sprite || ap.name.toLowerCase(),
                                    position: { x: p.position.x, y: p.position.y, z: p.position.z },
                                    direction: ap.direction || p.direction,
                                    hp: ap.hp || 100,
                                    maxHp: ap.maxHp || 100,
                                    level: ap.level || 1,
                                    isWild: false,
                                    ownerId: p.id
                                };
                                
                                const newFollower = new Pokemon(followerData);
                                newFollower.isFollower = true;
                                this.wildEntities.push(newFollower);
                            }
                        }
                    } catch (e) {}

                    // carrega spriteRows localmente para animação do outro player
                    try {
                        const rows = getSpriteRows(op.sprite || "default", op.direction || "down") || [];
                        op.spriteRows = rows; // rows: [[c,l,t],...]
                        op.animIndex = 0;
                        op.animTimer = 0;
                        op.animInterval = 0.15;
                        op.isMoving = true;
                        // dispara preload rápido das imagens dessas rows (não bloqueante)
                        for (const row of rows) {
                            (row || []).forEach(v => {
                                if (/^\d+$/.test(String(v)) && Number(v) > 0 && !this.loadedImages[String(v)]) {
                                    const img = new Image();
                                    img.src = `./assets/sprites/${v}.png`;
                                    this.loadedImages[String(v)] = img;
                                }
                            });
                        }
                        // agendar parada da animação do outro player após duração estimada
                        const duration = Math.max(100, (op.spriteRows?.length || 1) * (op.animInterval || 0.15) * 1000);
                        if (op.moveTimeout) clearTimeout(op.moveTimeout);
                        op.moveTimeout = setTimeout(() => {
                            try { op.isMoving = false; op.animIndex = 0; op.moveTimeout = null; } catch (e) {}
                        }, duration);
                    } catch (e) {}

                    // redesenha imediatamente para refletir a mudança
                    if (this.imagesPreloaded) this.renderMapImmediate();
                    return;
                }

            // resposta do servidor para quem solicitou spawn (contém objeto spawn)
            if (msg.action === "spawned" && msg.data) {
                try {
                    const p = msg.data;
                    // normaliza sprite: extrai dígitos se for string tipo "[39666]"
                    if (p && typeof p.sprite === "string") {
                        const m = String(p.sprite).match(/\d+/);
                        if (m) p.sprite = Number(m[0]);
                    }
                    // evita duplicata por id
                    const existing = (this.wildEntities || []).some(w => String(w.id) === String(p.id));
                    if (!existing) {
                        const ent = new Pokemon(p);
                        this.wildEntities.push(ent);
                        // solicita preload geral (inclui sprite do wild) e redesenha ao completar
                        this.preloadMapImages().then(() => { this.renderMapImmediate(); }).catch(()=>{ this.renderMapImmediate(); });
                    }
                } catch (e) {}
                return;
            }

            // spawn broadcast de wild pokemon (todos recebem)
            if (msg.action === "spawnBroadcast" && msg.pokemon) {
                try {
                    const p = msg.pokemon;
                    if (p && typeof p.sprite === "string") {
                        const m = String(p.sprite).match(/\d+/);
                        if (m) p.sprite = Number(m[0]);
                    }
                    
                    // Se é pokémon do player (ownerId existe), remove o anterior do mesmo owner
                    if (p.ownerId) {
                        const oldIndex = this.wildEntities.findIndex(w => w.ownerId === p.ownerId);
                        if (oldIndex !== -1) {
                            this.wildEntities.splice(oldIndex, 1);
                        }
                    }
                    
                    // Sempre adiciona o novo pokémon (sem verificação de duplicata para pokémons do player)
                    const ent = new Pokemon(p);
                    ent.ownerId = p.ownerId; // preserva o ownerId
                    ent.isWild = p.isWild || !p.ownerId; // marca se é selvagem
                    this.wildEntities.push(ent);
                    console.log(`✅ Pokemon spawned: ${ent.name} em (${ent.position.x},${ent.position.y}) | isWild: ${ent.isWild} | HP: ${ent.hp}/${ent.maxHp}`);
                    
                    // Se é pokemon do player atual, abre a UI de skills automaticamente
                    const myId = this.characterData?.id || this.player?.id;
                    if (p.ownerId && String(p.ownerId) === String(myId)) {
                        setTimeout(() => {
                            if (this.pokemonSkillsUI && typeof this.pokemonSkillsUI.show === 'function') {
                                this.pokemonSkillsUI.show(ent);
                            }
                        }, 100);
                    }
                    
                    // preload imagens relacionadas e redesenha
                    this.preloadMapImages().then(() => { this.renderMapImmediate(); }).catch(()=>{ this.renderMapImmediate(); });
                } catch (e) {
                    console.error("❌ Erro ao processar spawn:", e);
                }
                return;
            }

                 // Chat message de outro player
                if (msg.action === "chatMessage") {
                    const { playerName, message, playerId, type } = msg;
                    const msgType = type === "global" ? "global" : "local";
                    this.chatSystem.addMessage(playerName, message, msgType, playerId);
                    console.log(`💬 [${msgType.toUpperCase()}] ${playerName}: ${message}`);
                    return;
                }

                // System message
                if (msg.action === "systemMessage") {
                    const { message } = msg;
                    this.chatSystem.addMessage("Sistema", message, "system");
                    console.log(`[SISTEMA] ${message}`);
                    return;
                }
                
                // Pokemon danificado
                if (msg.action === "pokemonDamaged") {
                    const { targetId, damage, currentHp, maxHp, skillName } = msg;
                    const pokemon = this.wildEntities.find(w => w.id === targetId);
                    if (pokemon) {
                        pokemon.hp = currentHp;
                        pokemon.maxHp = maxHp;
                        console.log(`💥 ${pokemon.name} recebeu ${damage} de dano de ${skillName}! HP: ${currentHp}/${maxHp}`);
                        this.renderMapImmediate();
                    }
                    return;
                }
                
                // Pokemon morreu
                if (msg.action === "pokemonDeath") {
                    const { targetId } = msg;
                    const index = this.wildEntities.findIndex(w => w.id === targetId);
                    if (index !== -1) {
                        console.log(`💀 ${this.wildEntities[index].name} foi derrotado!`);
                        this.wildEntities.splice(index, 1);
                        // Se era o target, limpa
                        if (this.targetedPokemon && this.targetedPokemon.id === targetId) {
                            this.targetedPokemon = null;
                        }
                        this.renderMapImmediate();
                    }
                    return;
                }
                
                // Pokemon danificado
                if (msg.action === "pokemonDamaged") {
                    const { targetId, damage, currentHp, maxHp, skillName } = msg;
                    const pokemon = this.wildEntities.find(w => w.id === targetId);
                    if (pokemon) {
                        pokemon.hp = currentHp;
                        pokemon.maxHp = maxHp;
                        console.log(`💥 ${pokemon.name} recebeu ${damage} de dano de ${skillName}! HP: ${currentHp}/${maxHp}`);
                        this.renderMapImmediate();
                    }
                    return;
                }
                
                // Pokemon morreu
                if (msg.action === "pokemonDeath") {
                    const { targetId } = msg;
                    const index = this.wildEntities.findIndex(w => w.id === targetId);
                    if (index !== -1) {
                        console.log(`💀 ${this.wildEntities[index].name} foi derrotado!`);
                        this.wildEntities.splice(index, 1);
                        // Se era o target, limpa
                        if (this.targetedPokemon && this.targetedPokemon.id === targetId) {
                            this.targetedPokemon = null;
                        }
                        this.renderMapImmediate();
                    }
                    return;
                }
                
                // Recall broadcast - remove pokemon de outros players
                if (msg.action === "recallBroadcast") {
                    const { playerId, removedIds } = msg;
                    if (!removedIds || !Array.isArray(removedIds)) return;
                    
                    // Remove todos os pokemons dos IDs recebidos
                    for (const removedId of removedIds) {
                        const index = this.wildEntities.findIndex(w => w.id === removedId);
                        if (index !== -1) {
                            this.wildEntities.splice(index, 1);
                        }
                    }
                    
                    this.renderMapImmediate();
                    return;
                }

                // Wild Pokemon Updates - IA dos pokémons selvagens
                if (msg.action === "wildPokemonUpdates" && msg.updates) {
                    for (const update of msg.updates) {
                        try {
                            if (update.type === 'movement') {
                                // Atualiza posição do pokémon selvagem com interpolação suave
                                const pokemon = this.wildEntities.find(w => w.id === update.data.pokemonId);
                                if (pokemon) {
                                    // Define posição alvo para interpolação
                                    pokemon.targetPosition = {
                                        x: update.data.position.x,
                                        y: update.data.position.y,
                                        z: update.data.position.z
                                    };
                                    
                                    const newDirection = this._convertDirection(update.data.direction);
                                    // Usa updateDirection para trocar sprites corretamente
                                    if (pokemon.updateDirection) {
                                        pokemon.updateDirection(newDirection);
                                    } else {
                                        pokemon.direction = newDirection;
                                    }
                                    pokemon.startStepAnimation();
                                }
                            } else if (update.type === 'attack') {
                                // Atualiza HP do alvo
                                const { targetId, targetType, attackerType, damage, newHp, died } = update.data;
                                
                                if (targetType === 'wildPokemon' || targetType === 'pokemon') {
                                    const pokemon = this.wildEntities.find(w => w.id === targetId);
                                    if (pokemon) {
                                        pokemon.hp = newHp;
                                        const attacker = attackerType === 'player' ? 'Você' : 'Pokémon selvagem';
                                        console.log(`⚔️ ${attacker} atacou ${pokemon.name} causando ${damage} de dano! HP: ${newHp}${died ? ' (MORTO!)' : ''}`);
                                    }
                                } else if (targetType === 'player') {
                                    if (this.player && String(this.player.id) === String(targetId)) {
                                        this.player.hp = newHp;
                                        console.log(`⚔️ Você recebeu ${damage} de dano! HP: ${newHp}`);
                                    }
                                }
                            } else if (update.type === 'death') {
                                // Remove pokémon que morreu
                                const { pokemonId, position } = update.data;
                                const index = this.wildEntities.findIndex(w => w.id === pokemonId);
                                if (index !== -1) {
                                    const pokemon = this.wildEntities[index];
                                    console.log(`💀 ${pokemon.name} desmaiou!`);
                                    pokemon.hp = 0; // Marca como morto mas mantém na lista para captura
                                    
                                    // Adiciona sprite de corpo (31433)
                                    this.addDeadPokemonSprite(position.x, position.y);
                                }
                            } else if (update.type === 'pokemonDied') {
                                // Remove pokémon que morreu
                                const { pokemonId } = update.data;
                                const index = this.wildEntities.findIndex(w => w.id === pokemonId);
                                if (index !== -1) {
                                    const pokemon = this.wildEntities[index];
                                    console.log(`💀 ${pokemon.name} desmaiou!`);
                                    this.wildEntities.splice(index, 1);
                                    
                                    // Adiciona sprite de corpo (31433)
                                    this.addDeadPokemonSprite(pokemon.position.x, pokemon.position.y);
                                }
                            } else if (update.type === 'playerDied') {
                                // Player morreu
                                const { playerId } = update.data;
                                if (this.player && String(this.player.id) === String(playerId)) {
                                    console.log("💀 Você morreu!");
                                    alert("Você morreu! Recarregue a página.");
                                    this.player.hp = 0;
                                }
                            }
                        } catch (e) {
                            console.error("Erro ao processar update:", e);
                        }
                    }
                    
                    this.renderMapImmediate();
                    return;
                }

            // ...existing handlers...
            this.ws.onerror = (err) => reject(err);
            this.ws.onclose = () => console.log("[WS] Conexão fechada");
        });
    })
    }

    async updateStatusConnected(data) {
        if (!data) return;

        console.log("Recebendo dados iniciais do servidor:", data);
        
        this.player = data;
        this.otherPlayers = data.nearbyPlayers || {};
        this.mapNearby = data.mapNearbyPlayer || [];
        this.wildPokemons = data.wildPokemonsNearbyPlayer || [];
        
        console.log(`\n🐾 CLIENTE: Recebidos ${this.wildPokemons.length} pokémons selvagens:`);
        this.wildPokemons.forEach(wp => {
            const posX = wp.position?.x ?? wp.x ?? 0;
            const posY = wp.position?.y ?? wp.y ?? 0;
            const posZ = wp.position?.z ?? wp.z ?? 0;
            console.log(`  - ${wp.name} em (${posX},${posY},${posZ}) | isWild: ${wp.isWild} | ownerId: ${wp.ownerId || 'null'}`);
        });
        
        // Aplica snapshot (configura sprite, nome, vida, etc)
        this._applyServerSnapshot(data);
        
        // PRIMEIRO: Precarrega as sprites do player (crítico!)
        await this.preloadPlayerSprites();
        
        // SEGUNDO: Precarrega mapa e outros elementos
        await this.preloadMapImages();
        this.imagesPreloaded = true;
        
        // Força atualização do playerEntity para garantir que sprites estão configuradas
        this.playerEntity.animIndex = 0;
        this.playerEntity.isMoving = false;
        
        // TERCEIRO: Renderiza MULTIPLAS vezes para garantir
        this.renderMapImmediate();
        setTimeout(() => this.renderMapImmediate(), 50);
        setTimeout(() => this.renderMapImmediate(), 100);
        
        console.log(`✅ ${this.playerEntity.name} conectado! (${this.player.sprite})`);
        
        // Processa pokémons selvagens iniciais
        console.log(`\n🔄 Processando ${this.wildPokemons.length} pokémons selvagens para wildEntities...`);
        for (const wildPoke of this.wildPokemons) {
            try {
                console.log(`  📦 Dados do pokémon:`, wildPoke);
                // Verifica se já existe
                const existing = this.wildEntities.find(w => String(w.id) === String(wildPoke.id));
                if (!existing) {
                    const ent = new Pokemon(wildPoke);
                    ent.isWild = wildPoke.isWild ?? true;
                    ent.ownerId = wildPoke.ownerId || null;
                    this.wildEntities.push(ent);
                    console.log(`  ✅ Pokémon selvagem adicionado: ${ent.name} em (${ent.position.x},${ent.position.y},${ent.position.z}) | spriteRows:`, ent.spriteRows);
                } else {
                    console.log(`  ⚠️ Pokémon selvagem ${wildPoke.name} já existe, pulando...`);
                }
            } catch (e) {
                console.error(`  ❌ Erro ao processar pokémon selvagem ${wildPoke.name}:`, e);
            }
        }
        console.log(`🎮 Total de pokémons em wildEntities: ${this.wildEntities.length}\n`);
        
        // Processa pokémons dos outros players (followers)
        console.log(`\n🔄 Processando pokémons de ${Object.keys(this.otherPlayers).length} outros jogadores...`);
        for (const otherId in this.otherPlayers) {
            const otherPlayer = this.otherPlayers[otherId];
            if (otherPlayer.pokemons && Array.isArray(otherPlayer.pokemons)) {
                const activePokemon = otherPlayer.pokemons[otherPlayer.pokemonSolto - 1];
                if (activePokemon) {
                    // Verifica se já existe
                    const existingFollower = this.wildEntities.find(w => 
                        String(w.ownerId) === String(otherId) && String(w.name) === String(activePokemon.name)
                    );
                    
                    if (!existingFollower) {
                        const followerData = {
                            id: `${otherId}_pokemon_${otherPlayer.pokemonSolto}`,
                            name: activePokemon.name,
                            sprite: activePokemon.sprite || activePokemon.name.toLowerCase(),
                            position: {
                                x: activePokemon.x ?? otherPlayer.position.x,
                                y: activePokemon.y ?? otherPlayer.position.y,
                                z: otherPlayer.position.z
                            },
                            direction: activePokemon.direction || otherPlayer.direction,
                            hp: activePokemon.hp || 100,
                            maxHp: activePokemon.maxHp || 100,
                            level: activePokemon.level || 1,
                            isWild: false,
                            ownerId: otherId
                        };
                        
                        const follower = new Pokemon(followerData);
                        follower.isFollower = true;
                        this.wildEntities.push(follower);
                        console.log(`  ✅ Pokémon follower adicionado: ${follower.name} (dono: ${otherPlayer.name})`);
                    }
                }
            }
        }
        
        // Adiciona o pokémon ativo do próprio player (se houver)
        console.log(`\n🔄 Processando pokémon do próprio player...`);
        if (this.player && this.player.activePokemon) {
            const myActivePoke = this.player.activePokemon;
            const existingMyPokemon = this.wildEntities.find(w => 
                String(w.ownerId) === String(this.player.id)
            );
            
            if (!existingMyPokemon) {
                const myPokemonData = {
                    id: `${this.player.id}_pokemon_active`,
                    name: myActivePoke.name,
                    sprite: myActivePoke.sprite || myActivePoke.name.toLowerCase(),
                    position: { 
                        x: this.player.position.x, 
                        y: this.player.position.y, 
                        z: this.player.position.z 
                    },
                    direction: myActivePoke.direction || this.player.direction,
                    hp: myActivePoke.hp || 100,
                    maxHp: myActivePoke.maxHp || 100,
                    level: myActivePoke.level || 1,
                    isWild: false,
                    ownerId: this.player.id
                };
                
                const myFollower = new Pokemon(myPokemonData);
                myFollower.isFollower = true;
                this.wildEntities.push(myFollower);
                console.log(`  ✅ Meu pokémon follower adicionado: ${myFollower.name}`);
            } else {
                console.log(`  ⚠️ Meu pokémon follower já existe, pulando...`);
            }
        } else {
            console.log(`  ⚠️ Nenhum pokémon ativo encontrado para o player`);
        }
        
        try { this.ui.flushQueuedSpawns(); } catch (e) {}
    }

    updateStatusMoved(data) {
        if (!data) return;

        // aplica snapshot
        this._applyServerSnapshot(data);

        // Detecta tile ATUAL do player e aplica ações (teleport, floor transition)
        try {
            const tileStr = this.getTileAt(this.player.position.x, this.player.position.y);
            if (tileStr && this.ws && this.ws.readyState === WebSocket.OPEN) {
                const action = this._resolveTileAction(tileStr);

                // Floor UP/DOWN transition (desativado por enquanto)
                if (this.floorTransitionsEnabled && action && (action.floorUp || action.floorDown)) {
                    const now = Date.now();
                    if (!this._lastFloorTransitionAt || (now - this._lastFloorTransitionAt) > 500) {
                        this._lastFloorTransitionAt = now;
                        const currentZ = this.player.position.z;
                        let newZ = currentZ;
                        if (action.floorUp && currentZ < action.floorUp) newZ = action.floorUp;
                        else if (action.floorDown && currentZ > action.floorDown) newZ = action.floorDown;

                        if (newZ !== currentZ) {
                            console.log(`[FLOOR] Player está em ${this.player.position.x},${this.player.position.y} - moveu de andar ${currentZ} para ${newZ}`);
                            this.ws.send(JSON.stringify({
                                action: "teleport",
                                playerId: this.characterData.id,
                                payload: { x: Number(this.player.position.x), y: Number(this.player.position.y), z: Number(newZ) }
                            }));
                            return; // espera resposta do servidor
                        }
                    }
                }

                // Portal teleport (coordenadas diferentes)
                if (action && Array.isArray(action.teleportTo)) {
                    const now = Date.now();
                    if (!this._lastTeleportAt || (now - this._lastTeleportAt) > 1000) {
                        this._lastTeleportAt = now;
                        const [tx, ty, tz] = action.teleportTo;
                        if (typeof tx === "number" && typeof ty === "number") {
                            console.log(`[TELEPORT] Player teleportou para ${tx},${ty},${tz}`);
                            this.ws.send(JSON.stringify({
                                action: "teleport",
                                playerId: this.characterData.id,
                                payload: { x: Number(tx), y: Number(ty), z: Number(tz ?? this.player.position.z) }
                            }));
                            return; // espera resposta do servidor
                        }
                    }
                }
            }
        } catch (e) {
            console.error("[TILE ACTION ERROR]", e);
        }

        // movimento concluído -> aguarda a animação local terminar (não parar imediatamente)
        try {
            if (this.playerEntity.moveTimeout) { clearTimeout(this.playerEntity.moveTimeout); this.playerEntity.moveTimeout = null; }
            const rows = this.playerEntity.spriteRows[this.playerEntity.direction] || [];
            const duration = Math.max(100, (rows.length || 1) * (this.playerEntity.animInterval || 0.15) * 1000);
            this.playerEntity.moveTimeout = setTimeout(() => {
                try { this.playerEntity.isMoving = false; this.playerEntity.animIndex = 0; this.playerEntity.moveTimeout = null; } catch (e) {}
            }, duration);
        } catch (e) {}

        this.preloadMapImages().then(() => {
            this.imagesPreloaded = true;
            this.renderMapImmediate();
        }).catch(() => { });
    }

    // Precarrega apenas as sprites do player (todas as direções)
    async preloadPlayerSprites() {
        const spriteIds = new Set();
        
        try {
            const rowsObj = this.playerEntity?.spriteRows || {};
            for (const dir of Object.keys(rowsObj)) {
                const rows = rowsObj[dir] || [];
                for (const r of rows) {
                    (r || []).forEach(v => {
                        if (/^\d+$/.test(String(v)) && Number(v) > 0) {
                            spriteIds.add(String(v));
                        }
                    });
                }
            }
        } catch (e) {
            console.error("Erro ao coletar IDs das sprites do player:", e);
        }

        const promises = [];
        spriteIds.forEach(num => {
            if (!this.loadedImages[num]) {
                const p = new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => { 
                        this.loadedImages[num] = img; 
                        resolve(); 
                    };
                    img.onerror = () => { 
                        console.warn(`Falha ao carregar sprite: ${num}`);
                        resolve(); 
                    };
                    img.src = `./assets/sprites/${num}.png`;
                });
                promises.push(p);
            }
        });

        if (promises.length) {
            await Promise.all(promises);
        }
    }

    async preloadMapImages() {
        const tilesSet = new Set();

        try {
            if (this.mapNearby && this.mapNearby.length) {
                for (let row of this.mapNearby) {
                    for (let tileStr of row) {
                        const tileParts = String(tileStr).replace(/\[|\]/g, "").split(",");
                        tileParts.filter(p => /^\d+$/.test(p)).forEach(num => {
                            const s = String(num);
                            tilesSet.add(s);
                            try {
                                const action = TileActions?.[s];
                                const frames = action?.idleAnimation?.frames;
                                if (Array.isArray(frames)) {
                                    for (const f of frames) {
                                        if (/^\d+$/.test(String(f))) tilesSet.add(String(f));
                                    }
                                }
                            } catch (e) {}
                        });
                    }
                }
            }
        } catch (e) {}

        try {
            const rowsObj = this.playerEntity?.spriteRows || {};
            for (const dir of Object.keys(rowsObj)) {
                const rows = rowsObj[dir] || [];
                for (const r of rows) {
                    (r || []).forEach(v => {
                        if (/^\d+$/.test(String(v)) && Number(v) > 0) tilesSet.add(String(v));
                    });
                }
            }
        } catch (e) {}

        try {
            for (const we of (this.wildEntities || [])) {
                const parts = we.getCurrentSpriteParts?.() || [];
                (parts || []).forEach(v => {
                    if (/^\d+$/.test(String(v)) && Number(v) > 0) tilesSet.add(String(v));
                });
            }
            for (const w of (this.wildPokemons || [])) {
                if (w && typeof w === "object" && w.sprite) {
                    const sp = String(w.sprite).match(/\d+/);
                    if (sp) tilesSet.add(sp[0]);
                }
            }
        } catch (e) {}

        try {
            for (const key of Object.keys(TileActions || {})) {
                const act = TileActions[key];
                const frames = act?.idleAnimation?.frames;
                if (Array.isArray(frames)) {
                    frames.forEach(f => { if (/^\d+$/.test(String(f))) tilesSet.add(String(f)); });
                }
            }
        } catch (e) {}

        tilesSet.add("36204");
        tilesSet.add("36205");
        tilesSet.add("36206");

        const promises = [];
        tilesSet.forEach(num => {
            if (!this.loadedImages[num]) {
                const p = new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => { this.loadedImages[num] = img; resolve(); };
                    img.onerror = () => { this.loadedImages[num] = img; resolve(); };
                    img.src = `./assets/sprites/${num}.png`;
                });
                promises.push(p);
            }
        });

        if (promises.length) await Promise.all(promises);
        this.imagesPreloaded = true;
    }

    renderMap() {
        this.renderer.renderMap(this.mapNearby, this.loadedImages, this.imagesPreloaded);
    }

    loop() {
        const now = performance.now();
        const deltaMs = now - (this._lastFrameTime || now);
        this._lastFrameTime = now;
        const deltaSec = deltaMs / 1000; // Converter para segundos

        try { this.playerEntity.updateAnimation(deltaSec); } catch (e) {}

        try {
            for (const id in this.otherPlayers) {
                const op = this.otherPlayers[id];
                if (!op) continue;
                if (this.player && String(op.id) === String(this.player.id)) continue;
                if (!op.spriteRows || !op.spriteRows.length) continue;
                if (!op.isMoving) continue;
                op.animTimer = (op.animTimer || 0) + deltaSec;
                const interval = op.animInterval || 0.15;
                if (op.animTimer >= interval) {
                    op.animTimer -= interval;
                    op.animIndex = ((op.animIndex || 0) + 1) % (op.spriteRows.length || 1);
                }
            }
        } catch (e) {}

        try {
            // Monta lista de todas entidades para verificação de colisão
            const allEntities = [
                this.playerEntity,
                ...Object.values(this.otherPlayers || {}),
                ...(this.wildEntities || [])
            ].filter(e => e);
            
            // Atualiza efeitos de skills
            if (this.activeSkillEffects && this.activeSkillEffects.length > 0) {
                for (let i = this.activeSkillEffects.length - 1; i >= 0; i--) {
                    const effect = this.activeSkillEffects[i];
                    effect.frameTimer += deltaSec;
                    
                    if (effect.frameTimer >= effect.frameDuration) {
                        effect.frameTimer = 0;
                        effect.currentFrame++;
                        
                        if (effect.currentFrame >= effect.spriteIds.length) {
                            effect.finished = true;
                            this.activeSkillEffects.splice(i, 1);
                        }
                    }
                }
            }
        } catch (e) {}

        if (this.imagesPreloaded) this.renderMap();
        else this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.renderer.drawPlayer(this.playerEntity, this.mapOrigin);
        
        // Desenha pokémon follower do player principal (2 tiles atrás)
        let myFollowerCount = 0;
        for (const we of (this.wildEntities || [])) {
            if (we.ownerId && this.player && String(we.ownerId) === String(this.player.id)) {
                myFollowerCount++;
                console.log(`🎨 Renderizando MEU follower: ${we.name} | ownerId: ${we.ownerId} | position: (${we.position.x},${we.position.y})`);
                try {
                    // Calcula posição 2 tiles atrás do player baseado na direção
                    const followerPos = this.getFollowerPosition(
                        this.playerEntity.position.x, 
                        this.playerEntity.position.y, 
                        this.playerEntity.direction
                    );
                    
                    console.log(`  📍 Posição calculada do follower: (${followerPos.x},${followerPos.y}) | direção player: ${this.playerEntity.direction}`);
                    
                    // Cria entidade temporária com posição ajustada
                    const followerEntity = {
                        ...we,
                        position: { 
                            x: followerPos.x, 
                            y: followerPos.y, 
                            z: this.playerEntity.position.z 
                        },
                        direction: this.playerEntity.direction
                    };
                    
                    this.renderer.drawPlayer(followerEntity, this.mapOrigin);
                    console.log(`  ✅ Follower renderizado!`);
                } catch (e) {
                    console.error(`  ❌ Erro ao renderizar follower:`, e);
                }
            }
        }
        if (myFollowerCount === 0) {
            console.log(`⚠️ Nenhum follower encontrado para meu player (${this.player?.id})`);
        }

        for (const id in this.otherPlayers) {
            const p = this.otherPlayers[id];
            if (!p) continue;
            if (this.player && String(p.id) === String(this.player.id)) continue;
            if (!p.position || !Number.isFinite(p.position.x) || !Number.isFinite(p.position.y)) continue;

            // Carrega spriteRows se ainda não tiver
            if (!p.spriteRows || p.spriteRows.length === 0) {
                try {
                    const rows = getSpriteRows(p.sprite || "default", p.direction || "down") || [];
                    p.spriteRows = rows;
                    p.animIndex = 0;
                } catch (e) {
                    p.spriteRows = [];
                }
            }

            let parts = null;
            try {
                if (p.spriteRows && p.spriteRows.length) {
                    const row = p.spriteRows[p.animIndex || 0] || p.spriteRows[0];
                    parts = (row || []).map(v => Number(v) || null);
                }
            } catch (e) { parts = null; }

            const temp = {
                position: { x: p.position.x, y: p.position.y, z: (p.position.z ?? this.playerEntity.position.z) },
                name: p.name || "",
                hp: Number(p.hp ?? 100),
                maxHp: Number(p.maxHp ?? 100),
                getCurrentSpriteParts: () => parts || [36204, 36205, 36206]
            };
            this.renderer.drawPlayer(temp, this.mapOrigin);
        }
        
        // Desenha pokémon followers dos outros players (2 tiles atrás)
        for (const id in this.otherPlayers) {
            const p = this.otherPlayers[id];
            if (!p) continue;
            if (this.player && String(p.id) === String(this.player.id)) continue;
            
            // Procura follower deste player
            for (const we of (this.wildEntities || [])) {
                if (we.ownerId && String(we.ownerId) === String(p.id)) {
                    try {
                        // Calcula posição 2 tiles atrás do outro player
                        const followerPos = this.getFollowerPosition(p.position.x, p.position.y, p.direction);
                        
                        // Cria entidade temporária com posição ajustada
                        const followerEntity = {
                            ...we,
                            position: { 
                                x: followerPos.x, 
                                y: followerPos.y, 
                                z: p.position.z 
                            },
                            direction: p.direction
                        };
                        
                        this.renderer.drawPlayer(followerEntity, this.mapOrigin);
                    } catch (e) {}
                }
            }
        }

        // POKÉMONS desenhados ANTES dos overlays para respeitarem as camadas
        for (const pe of (this.wildEntities || [])) {
            try {
                // Atualiza animação (tanto selvagens quanto followers)
                if (pe.update) {
                    pe.update(deltaSec);
                }
                
                // Só desenha pokémons selvagens aqui (não-followers)
                // Followers são desenhados nas seções acima com posição calculada
                if (!pe.ownerId && !pe.isFollower) {
                    this.renderer.drawPlayer(pe, this.mapOrigin);
                }
            } catch (e) {}
        }

        try { this.renderer.renderOverlays(); } catch (e) {}
        try { this.ui.draw(); } catch (e) {}
        try { this.chatUI.draw(); } catch (e) {}

        requestAnimationFrame(this.loop.bind(this));
    }

    closeToMenu() {
        try {
            if (this.ws) try { this.ws.close(); } catch (e) {}
        } finally {
            window.location.reload();
        }
    }

    resizeCanvas() {
        try {
            this.ctx = this.canvas.getContext("2d");
            if (this.imagesPreloaded) {
                this.renderMapImmediate();
            }
        } catch (e) {}
    }

    tryClickWildPokemon(clickX, clickY) {
        if (!this.imagesPreloaded) return;
        
        // Se tem skill selecionada, converte clique em coordenada do mapa e usa skill
        if (this.selectedSkill) {
            const tileCoords = this.renderer.screenToTile(clickX, clickY);
            if (tileCoords) {
                const globalX = tileCoords.x + (this.mapOrigin?.x ?? 0);
                const globalY = tileCoords.y + (this.mapOrigin?.y ?? 0);
                this.useSkillOnTarget(globalX, globalY);
            }
            return;
        }
        
        // Se não tem skill selecionada, ataca ou captura pokemon
        if (!this.wildEntities.length) return;
        
        for (let i = this.wildEntities.length - 1; i >= 0; i--) {
            const we = this.wildEntities[i];
            if (!we || we.isFollower) continue;
            
            const localX = we.position.x - (this.mapOrigin?.x ?? 0);
            const localY = we.position.y - (this.mapOrigin?.y ?? 0);
            const idxX = Math.round(localX - this.renderer.xOffset);
            const idxY = Math.round(localY - this.renderer.yOffset);
            
            if (idxX < 0 || idxX >= this.renderer.viewCols || idxY < 0 || idxY >= this.renderer.viewRows) continue;
            
            const px = Math.round(this.renderer.colOffsets[idxX]);
            const py = Math.round(this.renderer.rowOffsets[idxY]);
            const pw = this.renderer.colWidths[idxX];
            const ph = this.renderer.rowHeights[idxY];
            
            if (clickX >= px && clickX <= px + pw && clickY >= py && clickY <= py + ph) {
                // Se o HP está em 0, tenta capturar. Caso contrário, ataca
                if (we.hp <= 0) {
                    this.attemptCapture(we);
                } else {
                    this.attackWildPokemon(we);
                }
                return;
            }
        }
    }
    
    attackWildPokemon(wildPokemon) {
        if (!wildPokemon) return;
        
        // Calcula distância até o pokémon selvagem
        const distance = Math.abs(this.player.position.x - wildPokemon.position.x) + 
                        Math.abs(this.player.position.y - wildPokemon.position.y);
        
        if (distance > 1) {
            console.log(`❌ ${wildPokemon.name} está muito longe! Chegue mais perto.`);
            return;
        }
        
        // Envia ataque ao servidor
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify({
                action: "attackWildPokemon",
                playerId: this.player.id,
                payload: { 
                    targetId: wildPokemon.id
                }
            }));
            console.log(`⚔️ Atacando ${wildPokemon.name}...`);
        }
    }
    
    attackNearestWildPokemon() {
        if (!this.player || !this.wildEntities || this.wildEntities.length === 0) return;
        
        let nearest = null;
        let minDistance = Infinity;
        
        // Encontra o pokémon selvagem mais próximo que ainda está vivo
        for (const wild of this.wildEntities) {
            if (!wild || wild.isFollower || wild.hp <= 0) continue;
            
            const distance = Math.abs(this.player.position.x - wild.position.x) + 
                           Math.abs(this.player.position.y - wild.position.y);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = wild;
            }
        }
        
        if (nearest) {
            this.attackWildPokemon(nearest);
        } else {
            console.log("❌ Nenhum pokémon selvagem próximo para atacar!");
        }
    }

    attemptCapture(wildPokemon) {
        const success = CaptureSystem.attemptCapture(wildPokemon, "normal");
        
        if (success) {
            console.log(`✓ ${wildPokemon.name} capturado!`);
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({
                    action: "capturePokemon",
                    playerId: this.characterData.id,
                    payload: { pokemonId: wildPokemon.id }
                }));
            }
            const idx = this.wildEntities.indexOf(wildPokemon);
            if (idx !== -1) this.wildEntities.splice(idx, 1);
            this.renderMapImmediate();
        } else {
            console.log(`✗ ${wildPokemon.name} escapou!`);
            wildPokemon._captureFailFlash = 0.5;
        }
    }

    addDeadPokemonSprite(x, y) {
        // Adiciona sprite de corpo morto
        this.deadPokemonBodies.push({ x, y, sprite: 31433 });
        
        // Precarrega a imagem do corpo se ainda não foi carregada
        if (!this.loadedImages['31433']) {
            const img = new Image();
            img.src = './assets/sprites/31433.png';
            this.loadedImages['31433'] = img;
        }
    }

    renderMapImmediate() {
        this.renderer.renderMap(this.mapNearby, this.loadedImages, this.imagesPreloaded);
        this.renderer.drawPlayer(this.playerEntity, this.mapOrigin);

        // Desenha corpos de pokémons mortos
        for (const body of (this.deadPokemonBodies || [])) {
            try {
                const temp = {
                    position: { x: body.x, y: body.y, z: this.playerEntity.position.z },
                    name: "",
                    hp: 0,
                    maxHp: 0,
                    getCurrentSpriteParts: () => [body.sprite, 0, 0]
                };
                this.renderer.drawPlayer(temp, this.mapOrigin);
            } catch (e) {}
        }



        for (const w of (this.wildPokemons || [])) {
            try {
                if (w && typeof w === "object" && (w.x !== undefined)) {
                    const temp = {
                        position: { x: w.x, y: w.y, z: w.z || this.playerEntity.position.z },
                        name: w.name || "",
                        hp: w.hp || 100,
                        maxHp: w.level ? 100 : 100,
                        getCurrentSpriteParts: () => [(w.sprite || 0), 0, 0]
                    };
                    this.renderer.drawPlayer(temp, this.mapOrigin);
                }
            } catch (e) {}
        }

        for (const id in this.otherPlayers) {
            const p = this.otherPlayers[id];
            if (!p) continue;
            if (this.player && String(p.id) === String(this.player.id)) continue;
            if (!p.position || !Number.isFinite(p.position.x) || !Number.isFinite(p.position.y)) continue;

            let parts = null;
            try {
                if (p.spriteRows && p.spriteRows.length) {
                    const row = p.spriteRows[p.animIndex || 0] || p.spriteRows[0];
                    parts = (row || []).map(v => Number(v) || null);
                }
            } catch (e) { parts = null; }

            const temp = {
                position: { x: p.position.x, y: p.position.y, z: (p.position.z ?? this.playerEntity.position.z) },
                name: p.name || "",
                hp: Number(p.hp ?? 100),
                maxHp: Number(p.maxHp ?? 100),
                getCurrentSpriteParts: () => parts || [36204, 36205, 36206]
            };
            this.renderer.drawPlayer(temp, this.mapOrigin);
        }

        try { this.renderer.renderOverlays(); } catch (e) {}
        try { this.ui.draw(); } catch (e) {}

        // POKÉMONS DESENHADOS POR ÚLTIMO para ficarem ACIMA de TUDO (overlays e UI)
        for (const pe of (this.wildEntities || [])) {
            try {
                const parts = pe.getCurrentSpriteParts();
                // Só avisa se tem valores null (não se for tudo 0, que é válido)
                const hasNull = parts.some(p => p === null);
                const hasNonZero = parts.some(p => p !== null && p !== 0);
                
                if (hasNull && !hasNonZero) {
                    console.warn(`⚠️ Pokémon ${pe.name} em (${pe.position.x},${pe.position.y}) sem sprites válidas:`, parts, `| spriteType: ${pe.spriteType} | spriteRows:`, pe.spriteRows);
                }
                this.renderer.drawPlayer(pe, this.mapOrigin, "yellow");
            } catch (e) {
                console.error("❌ Erro ao renderizar pokémon:", e, pe);
            }
        }

        // Renderizar efeitos de skills
        for (const effect of (this.activeSkillEffects || [])) {
            try {
                const spriteId = effect.spriteIds[effect.currentFrame];
                const img = this.loadedImages[spriteId];
                if (img) {
                    const screenPos = this.renderer.tileToScreen(effect.x, effect.y);
                    if (screenPos) {
                        this.renderer.ctx.drawImage(img, screenPos.x, screenPos.y, 32, 32);
                    }
                }
            } catch (e) {}
        }

        try { this.chatUI.draw(); } catch (e) { console.error("[CHAT UI ERROR]", e); }
    }

    movePlayerAndUpdateMap(x, y, z, direction = "down") {
        return new Promise((resolve, reject) => {
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                reject("WebSocket não está conectado");
                return;
            }

            const handleMessage = (event) => {
                const msg = JSON.parse(event.data);
                if (msg.action === "playerMoved") {
                    this.updateStatusMoved(msg.data);
                    this.ws.removeEventListener("message", handleMessage);
                    resolve(msg.data);
                }
            };

            this.ws.addEventListener("message", handleMessage);

            this.ws.send(JSON.stringify({
                action: "move",
                playerId: this.characterData.id,
                payload: { x, y, z, direction }
            }));
        });
    }
    
    // Callback quando skill do pokemon é selecionada
    onPokemonSkillSelected(pokemon, skillName, skillData) {
        this.selectedSkill = {
            pokemon: pokemon,
            skillName: skillName,
            skillData: skillData
        };
        
        // Mostra cursor especial ou mensagem indicando modo de seleção de alvo
        this.canvas.style.cursor = 'crosshair';
        console.log(`🎯 Skill ${skillName} selecionada! Clique no alvo para usar.`);
    }
    
    // Usa skill no alvo clicado
    useSkillOnTarget(targetX, targetY) {
        if (!this.selectedSkill) return;
        
        const { pokemon, skillName, skillData } = this.selectedSkill;
        
        // Se tem target selecionado, usa a posição do target
        let actualTargetX = targetX;
        let actualTargetY = targetY;
        let targetPokemon = null;
        
        // Verifica se há um Pokemon na posição clicada
        targetPokemon = this.wildEntities.find(w => 
            w.position.x === targetX && 
            w.position.y === targetY &&
            !w.ownerId // apenas selvagens
        );
        
        if (targetPokemon) {
            actualTargetX = targetPokemon.position.x;
            actualTargetY = targetPokemon.position.y;
        }
        
        // Calcula distância do pokemon ao alvo
        const dx = Math.abs(actualTargetX - pokemon.position.x);
        const dy = Math.abs(actualTargetY - pokemon.position.y);
        const distance = dx + dy;
        
        // Verifica alcance (máximo 5 tiles)
        if (distance > 5) {
            console.log(`❌ Alvo muito longe! Distância: ${distance} tiles`);
            this.selectedSkill = null;
            this.canvas.style.cursor = 'default';
            return;
        }
        
        // Cria efeito visual da skill
        this.createSkillEffect(actualTargetX, actualTargetY, skillData);
        
        // Se acertou um Pokemon selvagem, calcula dano e envia ao servidor
        if (targetPokemon) {
            const damage = skillData.power || 10;
            
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify({
                    action: "attackPokemon",
                    playerId: this.characterData.id,
                    payload: {
                        targetId: targetPokemon.id,
                        damage: damage,
                        skillName: skillName
                    }
                }));
            }
            
            console.log(`⚔️ ${pokemon.name} atacou ${targetPokemon.name} com ${skillName} (${damage} dano)!`);
        } else {
            console.log(`✨ ${pokemon.name} usou ${skillName} em (${actualTargetX}, ${actualTargetY})!`);
        }
        
        // Limpa seleção e reseta cursor
        this.selectedSkill = null;
        this.canvas.style.cursor = 'default';
    }
    
    // Cria efeito visual da skill com animação
    createSkillEffect(x, y, skillData) {
        if (!skillData || !skillData.spriteSkillList || skillData.spriteSkillList.length === 0) {
            console.warn('Skill sem sprites definidas');
            return;
        }
        
        // Adiciona efeito à lista de efeitos ativos
        if (!this.activeSkillEffects) this.activeSkillEffects = [];
        
        const effect = {
            x: x,
            y: y,
            spriteIds: skillData.spriteSkillList,
            currentFrame: 0,
            frameTimer: 0,
            frameDuration: 0.15, // 150ms por frame
            finished: false
        };
        
        this.activeSkillEffects.push(effect);
        
        // Precarrega sprites do efeito
        for (const spriteId of effect.spriteIds) {
            const key = String(spriteId);
            if (!this.loadedImages[key]) {
                const img = new Image();
                img.onload = () => { this.loadedImages[key] = img; };
                img.src = `./assets/sprites/${spriteId}.png`;
                this.loadedImages[key] = img;
            }
        }
    }

}
