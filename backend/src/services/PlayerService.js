// src/services/PlayerService.js

import {
    getPlayerById,
    getPlayerByAccountId,
    createPlayer,
    updatePlayerPosition
} from "../models/PlayerModel.js";

/**
 * Retorna o player da account
 * NÃO cria automaticamente
 */
export async function getPlayer(accountId) {
    return await getPlayerByAccountId(accountId);
}

/**
 * Cria um novo personagem para a account
 */
export async function createNewPlayer(accountId, name, townId = 1) {
    const existing = await getPlayerByAccountId(accountId);

    if (existing) {
        return {
            error: "Account já possui um personagem"
        };
    }

    const playerId = await createPlayer({
        accountId,
        name,
        townId
    });

    return await getPlayerById(playerId);
}

/**
 * Move o player no mapa
 */
export async function movePlayer(playerId, x, y) {
    const player = await getPlayerById(playerId);

    if (!player) {
        return {
            error: "Player não encontrado"
        };
    }

    await updatePlayerPosition(playerId, x, y);

    return {
        success: true,
        newPosition: { x, y }
    };
}
