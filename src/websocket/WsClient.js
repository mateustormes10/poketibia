export default class WsClient {
    constructor(game, url = "ws://localhost:8080", token) {
        this.game = game;
        this.url = url;
        this.token = token;
        this.ws = null;
        this.playerId = null;
        this.pendingMoves = {}; // { playerId: { x, y, z } }
this.syncRequested = false;

        this.otherPlayers = {}; // { playerId: { x, y, z, name, sprite } }
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                console.log("[WS] Conectado ao servidor");
                resolve();
                this.auth();
            };

            this.ws.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                this.handleMessage(msg);
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

    auth() {
        this.send("auth", { token: this.token });
    }

    send(action, payload = {}) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        this.ws.send(JSON.stringify({ action, ...payload }));
    }

    handleMessage(msg) {
        switch (msg.action) {
            case "auth_success":
                this.playerId = msg.player.id;
                console.log("[WS] Autenticado como", msg.player.name);
                this.send("request_all_players");
                break;

            case "all_players":
                this.otherPlayers = {};

                if (msg.players) {
                    Object.values(msg.players).forEach(p => {
                        if (p.id === this.playerId) return; // 🔥 REMOVE O PLAYER LOCAL

                        this.otherPlayers[p.id] = {
                            x: p.position.x,
                            y: p.position.y,
                            z: p.position.z,
                            name: p.name,
                            itsme: p.id === this.playerId ? "yes" : "no",
                            spriteType: p.spriteType || "default"
                        };
                    });

                         Object.entries(this.pendingMoves).forEach(([id, pos]) => {
                            if (this.otherPlayers[id]) {
                                this.otherPlayers[id].x = pos.x;
                                this.otherPlayers[id].y = pos.y;
                                this.otherPlayers[id].z = pos.z;
                            }
                        });

                        this.pendingMoves = {};
                }

                this.game.updatePlayerFromWS(
                    Object.values(msg.players).map(p => ({
                        x: p.position.x,
                        y: p.position.y,
                        z: p.position.z,
                        name: p.name,
                        itsme: p.id === this.playerId ? "yes" : "no",
                        spriteType: p.spriteType || "default"
                    }))
                );


                console.log(
                    "[WS] Lista de players conectados (exceto você):",
                     Object.values(this.otherPlayers)
                );
                break;

            case "player_move": {
                const { playerId, position } = msg;
                if (playerId === this.playerId) return;
                if (!position) return;

                if (!this.otherPlayers[playerId]) {
                    this.pendingMoves[playerId] = position;

                    // 🔥 PEDE SINCRONIZAÇÃO
                    if (!this.syncRequested) {
                        this.syncRequested = true;
                        this.send("request_all_players");
                    }
                    return;
                }

                this.otherPlayers[playerId].x = position.x;
                this.otherPlayers[playerId].y = position.y;
                this.otherPlayers[playerId].z = position.z;
                break;
            }




            case "player_disconnect":
                delete this.otherPlayers[msg.playerId];
                console.log("[WS] Player desconectou:", msg.playerId);
                break;

            case "chat":
                this.game.showMessage(`[${msg.playerName}]: ${msg.message}`, 3000);
                break;

            default:
                console.log("[WS] Mensagem recebida:", msg);
        }
    }

    move(x, y, z) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
        console.log(`[WS] Enviando posição: x=${x.toFixed(2)}, y=${y.toFixed(2)}, z=${z}`); // <-- log adicionado
        this.send("movement", { playerId: this.playerId, x, y, z });
    }

}
