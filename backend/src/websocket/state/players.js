export function getNearbyPlayers(sourcePlayer, range = 20) {
    const result = [];

    for (const [ws, player] of players.entries()) {
        if (player.id === sourcePlayer.id) continue;
        if (player.position.z !== sourcePlayer.position.z) continue;

        const dx = Math.abs(player.position.x - sourcePlayer.position.x);
        const dy = Math.abs(player.position.y - sourcePlayer.position.y);

        if (Math.max(dx, dy) <= range) {
            result.push({ ws, player });
        }
    }

    return result;
}

function isNearby(playerState, otherPlayerState) {
    // Aqui você define a lógica de proximidade, usando coordenadas (x, y, z)
    const distance = calculateDistance(playerState, otherPlayerState);
    return distance <= 20; // Proximidade de 20 sqm
}

function calculateDistance(player1, player2) {
    // Calcula a distância entre dois jogadores
    return Math.sqrt(Math.pow(player1.x - player2.x, 2) + Math.pow(player1.y - player2.y, 2));
}

const players = new Map();

/**
 * Adiciona player ao estado do servidor
 */
export function registerPlayer(ws, player) {
    players.set(ws, {
        id: player.id,
        name: player.name,
        position: {
            x: 100,
            y: 100,
            z: 7
        },
        lastAction: Date.now()
    });
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

/**
 * Remove player do estado
 */
export function removePlayer(playerId) {
    players.delete(playerId);
}

/**
 * Retorna todos os players conectados
 */
export function getAllPlayers() {
    return players;
}

/**
 * Retorna player específico
 */
export function getPlayer(ws) {
    return players.get(ws);
}

export function getPlayerById(playerId) {
    for (const player of players.values()) {
        if (player.id === playerId) return player;
    }
    return null;
}

/**
 * Remove players inativos (idle > 5min)
 */
export function cleanupIdlePlayers(timeout = 300000) {
    const now = Date.now();

    for (const [id, player] of players) {
        if (now - player.lastAction > timeout) {
            try {
                player.socket.close();
            } catch {}
            players.delete(id);
        }
    }
}