
const playersByWs = new Map();   // ws -> player
const playersById = new Map();   // id -> player


/**
 * Adiciona player ao estado do servidor
 */
export function registerPlayer(ws, player) {
    const state = {
        id: player.id,
        name: player.name,
        position: { x: 20, y: 20, z: 3 },
        spriteId: player.spriteId ?? '14498', // fallback
        lastAction: Date.now(),
        ws
    };

    playersByWs.set(ws, state);
    playersById.set(player.id, state);
}


/**
 * Atualiza posição ou estado do player
 */
export function updatePlayerState(playerId, updates) {
    const player = players.get(playerId);
    if (!player) return null;

    Object.assign(player, updates);
    player.lastAction = Date.now();
    return player;
}

// Remove player
export function removePlayer(ws) {
    const player = playersByWs.get(ws);
    if (!player) return;

    playersById.delete(player.id);
    playersByWs.delete(ws);
}

// Retorna player por WebSocket
export function getPlayer(ws) {
    return playersByWs.get(ws);
}
export function getPlayerById(id) {
    return playersById.get(id);
}

// Retorna todos os players
export function getAllPlayers() {
    return playersById; // << ITERÁVEL LIMPO
}

// Busca players próximos
export function getNearbyPlayers(sourcePlayer, range = 20) {
    const result = [];

    for (const player of playersById.values()) {
        if (player.id === sourcePlayer.id) continue;
        if (player.position.z !== sourcePlayer.position.z) continue;

        const dx = Math.abs(player.position.x - sourcePlayer.position.x);
        const dy = Math.abs(player.position.y - sourcePlayer.position.y);

        if (Math.max(dx, dy) <= range) {
            result.push(player);
        }
    }

    return result;
}
// Remove players inativos
export function cleanupIdlePlayers(timeout = 300000) {
    const now = Date.now();
    for (const [ws, player] of players) {
        if (now - player.lastAction > timeout) {
            try { ws.close(); } catch {}
            players.delete(ws);
        }
    }
}