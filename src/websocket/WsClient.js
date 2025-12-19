import { SpritePlayerList } from "../SpritePlayerList.js";
import Player from "../player.js";

export function getValidSpriteId(type = "default", direction = "down") {
    const spriteType = SpritePlayerList[type] || SpritePlayerList.default;
    const dir = spriteType[direction] || spriteType.down;
    const id = dir?.[0]?.[0];
    return (id !== null && id !== undefined)
        ? id
        : SpritePlayerList.default.down[0][0];
}

export default class WsClient {
    constructor(game, url = "ws://localhost:8080", playerId = null) {
        this.game = game;
        this.url = url;
        this.playerId = playerId;

        this.ws = null;

        this.player = null;
        this.otherPlayers = {};
        this.mapNearby = [];
        this.wildPokemons = [];
    }

    /* ================= CONEXÃO ================= */

connect(characterData, pokemons = [], iniciandoGame = false) {
    return new Promise((resolve, reject) => {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = () => {
            console.log("[WS] Conectado ao servidor");


            if (iniciandoGame) {
                // campos que o backend espera diretamente
                const connectPayload = {
                    name: characterData.name,
                    speed: characterData.activePokemons[0]?.speed || 1,
                    pokemonSolto: 1,
                    direction: characterData.direction || "down",
                    level: characterData.level,
                    sprite: "summonerMale",
                    position: {
                        x: characterData.posx,
                        y: characterData.posy,
                        z: characterData.posz
                    },
                    pokemons: characterData.activePokemons.map((p, i) => ({
                        id: `p${i+1}`,
                        name: p.name,
                        x: characterData.posx,
                        y: characterData.posy,
                        direction: p.direction || "down",
                        sprite: p.sprite_down || "[0]"
                    })),
                    
                };

                this.send("connect", { 
                    playerId: this.playerId || characterData.id, 
                    payload: connectPayload 
                });
                iniciandoGame = false;
            }


            resolve();
        };

        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);

            if (msg.action === "playerConnected") {
                this.playerId = msg.playerId || this.playerId;
                if (msg.data) {
                    this.updatePlayer(msg.data, true);
                } else {
                    console.warn("[WS] playerConnected sem data:", msg);
                    // tenta requisitar playerData
                    this.getGameState();
                }
            }
        };

        this.ws.onerror = (err) => {
            console.error("[WS] Erro:", err);
            reject(err);
        };

        this.ws.onclose = () => {
            console.log("[WS] Conexão fechada");
        };
    });
}




    send(action, payload = {}) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        this.ws.send(JSON.stringify({ action, ...payload }));
    }

    /* ================= PLAYER ================= */

    updatePlayer(data, fullUpdate = false) {
        if (!data) return;

        // this.player = data;
        this.wildPokemons = data.wildPokemonsNearbyPlayer || [];

        if (fullUpdate) {
            this.mapNearby = data.mapNearbyPlayer || [];
        }

        // Outros players
        Object.values(data.nearbyPlayers || {}).forEach(p => {
            if (p.id === this.playerId) return;

            if (!this.otherPlayers[p.id]) {
                this.otherPlayers[p.id] = new Player(
                    p.position.x,
                    p.position.y,
                    p.name,
                    p.sprite || "default"
                );
            }
        });

        if (this.game && this.game.onPlayerUpdate) {
            this.game.onPlayerUpdate(
                data,
                this.otherPlayers,
                this.mapNearby,
                this.wildPokemons
            );
        }


    }

    updateGameState(data) {
        if (!data) return;

        Object.values(data.players || {}).forEach(p => {
            // if (p.id === this.playerId) {
            //     this.updatePlayer(p, true);
            //     return;
            // }

            // if (!this.otherPlayers[p.id]) {
            //     this.otherPlayers[p.id] = new Player(
            //         p.position.x,
            //         p.position.y,
            //         p.name,
            //         p.sprite || "default"
            //     );
            // } else {
            //     const op = this.otherPlayers[p.id];
            //     op.x = p.position.x;
            //     op.y = p.position.y;
            //     op.direction = p.direction;
            //     op.spriteType = p.sprite || op.spriteType;
            // }
        });

        this.wildPokemons = Object.values(data.wildPokemons || {});
    }


    /* ================= AÇÕES ================= */

    move(x, y, z, direction = "down") {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        console.log(`[WS] Move: ${x},${y},${z} dir=${direction}`);

        this.send("move", {
            playerId: this.playerId,
            payload: { x, y, z, direction }
        });
    }

    releasePokemon() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        this.send("release", { playerId: this.playerId });
    }

    getGameState() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        this.send("getGameState", { playerId: this.playerId });
    }
}
