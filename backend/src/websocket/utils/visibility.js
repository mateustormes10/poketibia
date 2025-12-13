
import { getDistance } from "./distance.js";

/**
 * Retorna jogadores visíveis dentro de um raio (sqm)
 */
export function checkVisibility(originPlayer, players, range = 20) {
    const visible = [];

    for (const [, target] of players) {
        if (target.id === originPlayer.id) continue;

        const distance = getDistance(
            originPlayer.x,
            originPlayer.y,
            target.x,
            target.y
        );

        if (distance <= range) {
            visible.push(target);
        }
    }

    return visible;
}

export function isVisibleToPlayer(playerState, targetState) {
    // Calcula a visibilidade entre dois jogadores ou um jogador e um Pokémon
    return calculateDistance(playerState, targetState) <= 20; // Ajuste a visibilidade
}