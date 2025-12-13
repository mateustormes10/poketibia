import { handleCombatAction } from "../../models/CombatModel.js";
import { sendError } from "../utils/errorHandler.js";
import { getPlayer, getPlayerById } from "../state/players.js";

export async function handleCombat(ws, payload) {
    const { enemyId, action } = payload;

    const playerState = getPlayer(ws);
    if (!playerState) {
        sendError(ws, "Player not authenticated.");
        return;
    }

    const result = await handleCombatAction(playerState.id, enemyId, action);
    if (!result.success) {
        sendError(ws, "Combat action failed.");
        return;
    }

    // Envia resultado para o player atual
    if (playerState.ws) {
        playerState.ws.send(JSON.stringify({ action: "combat_result", result }));
    }

    // Envia resultado para o inimigo, se conectado
    const enemyState = getPlayerById(enemyId);
    if (enemyState && enemyState.ws) {
        enemyState.ws.send(JSON.stringify({ action: "combat_result", result }));
    }
}
