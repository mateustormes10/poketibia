import { catchPokemonAction } from "../../models/PokemonModel.js";
import { getPlayer, getNearbyPlayers } from "../state/players.js";
import { sendError } from "../utils/errorHandler.js";


export async function handlePokemonAction(ws, payload) {
    const { pokemonId } = payload;

    // Pega o player pelo WebSocket
    const player = getPlayer(ws);
    if (!player) {
        sendError(ws, "Not authenticated");
        return;
    }

    // Atualiza a última ação
    player.lastAction = Date.now();

    // Captura o Pokémon
    const result = await catchPokemonAction(player.id, pokemonId);
    if (!result.success) {
        sendError(ws, "Failed to catch the Pokémon.");
        return;
    }

    // Retorna para o próprio player
    ws.send(JSON.stringify({
        action: "pokemon_caught",
        playerId: player.id,
        pokemonId
    }));

    // Notifica jogadores próximos
    const nearbyPlayers = getNearbyPlayers(player);

    nearbyPlayers.forEach(({ ws: nearbyWs }) => {
        nearbyWs.send(JSON.stringify({
            action: "pokemon_update",
            pokemon: {
                id: result.pokemon.id,
                name: result.pokemon.name,
                position: result.pokemon.position,
                alive: result.pokemon.alive,
                ownerId: player.id
            }
        }));
    });

}
