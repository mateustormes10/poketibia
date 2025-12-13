import { getPlayer, getNearbyPlayers } from "../state/players.js";
import { sendError } from "../utils/errorHandler.js";

export async function handleChat(ws, payload) {
    const { message } = payload;

    // Pega o player pelo WebSocket
    const player = getPlayer(ws);
    if (!player) {
        sendError(ws, "Not authenticated");
        return;
    }

    // Atualiza a última ação
    player.lastAction = Date.now();

    // Enviar para todos jogadores próximos
    const nearbyPlayers = getNearbyPlayers(player);

    nearbyPlayers.forEach(({ ws: nearbyWs }) => {
        nearbyWs.send(JSON.stringify({
            action: "chat_message",
            playerId: player.id,
            message
        }));
    });
}
