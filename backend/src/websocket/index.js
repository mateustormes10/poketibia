import { WebSocketServer } from "ws";
import { handleAuth } from "./handlers/auth.js";
import { handleMovement } from "./handlers/movement.js";
import { handleChat } from "./handlers/chat.js";
import { handlePokemonAction } from "./handlers/pokemon.js";
import { handleCombat } from "./handlers/combat.js";
import { getAllPlayers, registerPlayer, removePlayer } from "./state/players.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("[WS] Novo cliente conectado");

    ws.on("message", async (message) => {
        let data;
        try {
            data = JSON.parse(message);
        } catch (err) {
            console.error("[WS] JSON inválido:", message);
            return;
        }

        switch (data.action) {
            case "auth":
                console.log("[WS] Ação: auth");
                await handleAuth(ws, data); // aqui você registra o player com registerPlayer
                break;
            case "movement": // ação que o cliente deve enviar
                await handleMovement(ws, data);
                break;
            case "chat":
                await handleChat(ws, data);
                break;
            case "pokemon":
                await handlePokemonAction(ws, data);
                break;
            case "combat":
                await handleCombat(ws, data);
                break;
            case "request_all_players":
                const allPlayersObj = {};
                for (const player of getAllPlayers().values()) {
                    allPlayersObj[player.id] = {
                        id: player.id,
                        name: player.name,
                        position: player.position,
                        lastAction: player.lastAction,
                        spriteId: player.spriteId ?? "default"  // fallback
                    };
                }
                ws.send(JSON.stringify({ action: "all_players", players: allPlayersObj }));
                break;
            default:
                console.warn("[WS] Ação desconhecida:", data.action);
        }
    });

    ws.on("close", () => {
        console.log("[WS] Cliente desconectou");
        removePlayer(ws);
    });

    ws.on("error", (err) => {
        console.error("[WS] Erro no cliente:", err);
        removePlayer(ws);
    });
});

console.log("Servidor WebSocket rodando na porta 8080");
