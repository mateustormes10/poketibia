import { WebSocketServer } from "ws";
import { handleAuth } from "./handlers/auth.js";
import { handleMovement } from "./handlers/movement.js";
import { handleChat } from "./handlers/chat.js";
import { handlePokemonAction } from "./handlers/pokemon.js";
import { handleCombat } from "./handlers/combat.js";
import { cleanupIdlePlayers, getAllPlayers } from "./state/players.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
    ws.on("message", async (message) => {
        const data = JSON.parse(message);

        switch (data.action) {
            case "auth":
                await handleAuth(ws, data);
                break;
            case "movement":
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
                // transforma o Map em objeto JSON indexado pelo player.id
                const allPlayersObj = {};
                for (const [, player] of getAllPlayers()) {
                    allPlayersObj[player.id] = {
                        id: player.id,
                        name: player.name,
                        position: player.position,
                        lastAction: player.lastAction
                    };
                }
                ws.send(JSON.stringify({ action: "all_players", players: allPlayersObj }));
                break;

        }
    });
});

// Limpeza automática de players idle
setInterval(cleanupIdlePlayers, 60000);

console.log("WebSocket rodando em ws://localhost:8080");
