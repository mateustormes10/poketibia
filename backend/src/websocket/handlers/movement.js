import { updatePlayerPosition } from "../../models/PlayerModel.js";
import { getPlayer, getNearbyPlayers } from "../state/players.js";
import { sendError } from "../utils/errorHandler.js";

export async function handleMovement(ws, payload) {
    const player = getPlayer(ws);
    if (!player) {
        sendError(ws, "Not authenticated");
        console.log("[Movement] Player não autenticado");
        return;
    }

    const { x, y, z } = payload;
    console.log(`[Movement] Atualizando player ${player.id} para x=${x}, y=${y}, z=${z}`);

    // Atualiza estado em memória
    player.position = { x, y, z };
    player.lastAction = Date.now();

    // Persiste no banco (opcional)
    await updatePlayerPosition(player.id, x, y, z);

    // Notifica jogadores próximos
    const nearbyPlayers = getNearbyPlayers(player);
    console.log(`[Movement] Notificando ${nearbyPlayers.length} players próximos`);

    nearbyPlayers.forEach((nearbyPlayer) => {
        if (nearbyPlayer.ws && nearbyPlayer.ws.readyState === 1) { // 1 = OPEN
            nearbyPlayer.ws.send(JSON.stringify({
                action: "player_move",
                playerId: player.id,
                position: player.position
            }));
            console.log(`[Movement] Enviado player_move para player ${nearbyPlayer.id}`);
        }
    });
}
