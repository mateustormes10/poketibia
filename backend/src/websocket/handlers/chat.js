import { getPlayer, getNearbyPlayers } from "../state/players.js";
import { sendError } from "../utils/errorHandler.js";

export async function handleChat(ws, payload) {
    const { message } = payload;

    // Pega o player pelo WebSocket
    const player = getPlayer(ws);
    if (!player) {
        sendError(ws, "Not authenticated");
        console.log("[Chat] Player não autenticado");
        return;
    }

    // Atualiza a última ação
    player.lastAction = Date.now();

    // Enviar para todos jogadores próximos
    const nearbyPlayers = getNearbyPlayers(player);
    console.log(`[Chat] ${player.name} enviando mensagem para ${nearbyPlayers.length} players: ${message}`);


    nearbyPlayers.forEach(({ ws: nearbyWs }) => {
        nearbyWs.send(JSON.stringify({
            action: "chat_message",
            playerId: player.id,
            message
        }));
    });
}
