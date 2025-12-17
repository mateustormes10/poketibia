// src/utils/TestClient.js
import WebSocket from "ws";

export class TestClient {
    constructor(name, token) {
        this.name = name;
        this.token = token;
        this.ws = null;
        this.playerId = null;
    }

    connect(url = "ws://localhost:8080") {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(url);

            this.ws.on("open", () => {
                console.log(`[${this.name}] Conectado ao WS`);
                resolve();
            });

            this.ws.on("message", (data) => {
                const msg = JSON.parse(data.toString());
                console.log(`[${this.name}] Recebido:`, JSON.stringify(msg));
                if (msg.action === "auth_success") {
                    this.playerId = msg.player.id;
                }
            });

            this.ws.on("close", () => {
                console.log(`[${this.name}] Conexão fechada`);
            });

            this.ws.on("error", (err) => {
                console.error(`[${this.name}] Erro WS:`, err);
                reject(err);
            });
        });
    }

    send(action, payload = {}) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error(`[${this.name}] WS não está aberto`);
            return;
        }
        const message = { action, ...payload };
        console.log(`[${this.name}] Enviando:`, JSON.stringify(message));
        this.ws.send(JSON.stringify(message));
    }

    async auth() {
        this.send("auth", { token: this.token });
        await this.wait(500); // aguarda resposta
    }

    async move(x, y, z = 3) {
        this.send("movement", { playerId: this.playerId, x, y, z });
        await this.wait(300);
    }

    async requestAllPlayers() {
        this.send("request_all_players");
        await this.wait(300); // aguarda resposta
    }


    async chat(message) {
        this.send("chat", { playerId: this.playerId, message });
        await this.wait(300);
    }

    async catchPokemon(pokemonId) {
        this.send("pokemon", { playerId: this.playerId, type: "catch", pokemonId });
        await this.wait(500);
    }

    async attack(targetId) {
        this.send("combat", { playerId: this.playerId, targetId });
        await this.wait(500);
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    close() {
        if (this.ws) this.ws.close();
    }
}

