import { getPlayer, getNearbyPlayers, getAllPlayers } from "../state/players.js";
import { sendError } from "../utils/errorHandler.js";
import { gameMap } from "../state/map.js"; // ou onde seu mapa estiver
import { getAllPokemons } from "../state/pokemons.js";
import { updatePlayerSprite, updatePlayerPosition } from "../../models/PlayerModel.js";

export async function handleMovement(ws, payload) {
    const player = getPlayer(ws);
    if (!player) return;

    const { x, y, z } = payload;

    const tx = Math.floor(x);
    const ty = Math.floor(y);
    const tz = z;

    await updatePlayerSprite(player.id, player.spriteId ?? '14498');
    // 1. MAPA
    const tile = gameMap.getTile(tx, ty, tz);
    if (!tile) {
        console.log(`[MOVE] Tile inexistente: x=${tx}, y=${ty}, z=${tz}`);
        ws.send(JSON.stringify({
            action: "move_denied",
            reason: "tile_not_found",
            x: tx, y: ty, z: tz
        }));
        return;
    }

    if (tile.walkable === false) {
        console.log(`[MOVE] Tile bloqueado (N): x=${tx}, y=${ty}, z=${tz}`);
        ws.send(JSON.stringify({
            action: "move_denied",
            reason: "blocked_tile",
            x: tx, y: ty, z: tz
        }));
        return;
    }


    // 2. PLAYERS
    for (const other of getAllPlayers().values()) {
        const distance = 0.5; // tolerância de meio tile
        if (other.position.z === tz &&
            Math.abs(other.position.x - x) < distance &&
            Math.abs(other.position.y - y) < distance) {
            ws.send(JSON.stringify({
                action: "move_denied",
                reason: "player_collision",
                x, y, z: tz
            }));
            return;
        }
    }


    // 3. POKEMONS
    for (const mon of Array.from(getAllPokemons())) {
        if (!mon.alive) continue;
        if (mon.position.z !== tz) continue;

        if (Math.floor(mon.position.x) === tx &&
            Math.floor(mon.position.y) === ty) {
            console.log(`[MOVE] Colisão com Pokémon: ${mon.id} - x=${tx}, y=${ty}, z=${tz}`);
            ws.send(JSON.stringify({
                action: "move_denied",
                reason: "pokemon_collision",
                x: tx, y: ty, z: tz
            }));
            return;
        }
    }

    console.log(`[MOVE] Player ${player.id} movido para x=${x}, y=${y}, z=${z}`);

    // 4. APLICA
    player.position.x = x;
    player.position.y = y;
    player.position.z = z;
    player.lastAction = Date.now();

    // se vier no payload, atualiza o sprite do player
    if (payload.spriteId) {
        player.spriteId = payload.spriteId;
    }

        // Salva posição e spriteId no banco
    await updatePlayerPosition(player.id, x, y, z);

    // 5. NOTIFICA
    for (const p of getAllPlayers().values()) {
    p.ws?.send(JSON.stringify({
        action: "player_move",
        playerId: player.id,
        position: player.position,
        spriteId: player.spriteId ?? "default"  // fallback
    }));
}
}