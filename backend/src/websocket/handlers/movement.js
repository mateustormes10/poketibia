import { updatePlayerPosition } from "../../models/PlayerModel.js"; // opcional: DB
import { getPlayer, getNearbyPlayers } from "../state/players.js";
import { sendError } from "../utils/errorHandler.js";

export async function handleMovement(ws, payload) {
    const player = getPlayer(ws);
    if (!player) {
        sendError(ws, "Not authenticated");
        return;
    }

    const { x, y, z } = payload;

    // Atualiza estado em memória
    player.position = { x, y, z };
    player.lastAction = Date.now();

    // Persiste no banco (opcional)
    await updatePlayerPosition(player.id, x, y, z);

    // Notifica jogadores próximos
    const nearbyPlayers = getNearbyPlayers(player);
    nearbyPlayers.forEach(({ ws: nearbyWs }) => {
        nearbyWs.send(JSON.stringify({
            action: "player_move",
            playerId: player.id,
            position: player.position
        }));
    });
}
