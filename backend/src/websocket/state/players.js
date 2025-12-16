

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
        position: { x: 20, y: 20, z: 3 },
        spriteId: player.spriteId,  // ID do sprite do jogador
        lastAction: Date.now(),
        ws // guardando o ws dentro do objeto facilita notificações
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

// Remove player
export function removePlayer(ws) {
    players.delete(ws);
}

// Retorna player por WebSocket
export function getPlayer(ws) {
    return players.get(ws);
}
export function getPlayerById(playerId) {
    for (const player of players.values()) {
        if (player.id === playerId) return player;
    }
    return null;
}

// Retorna todos os players
export function getAllPlayers() {
    return players;
}

// Busca players próximos
export function getNearbyPlayers(sourcePlayer, range = 20) {
    const result = [];
    for (const player of players.values()) {
        if (player.id === sourcePlayer.id) continue;
        if (player.position.z !== sourcePlayer.position.z) continue;

        const dx = Math.abs(player.position.x - sourcePlayer.position.x);
        const dy = Math.abs(player.position.y - sourcePlayer.position.y);

        if (Math.max(dx, dy) <= range) {
            result.push(player); // agora retornamos apenas o player, ws incluso dentro
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