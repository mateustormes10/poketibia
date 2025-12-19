import jwt from "jsonwebtoken";
import { getPlayerById } from "../../models/PlayerModel.js";
import { registerPlayer, getPlayerById as getPlayerByIdFromState } from "../state/players.js";
import { getAllPokemons } from "../state/pokemons.js";

export async function handleAuth(ws, data) {
    try {
        let token = data.token;
        console.log("[Auth] Token recebido:", token);

        if (!token) {
            ws.send(JSON.stringify({
                action: "error",
                message: "Token não informado"
            }));
            console.log("[Auth] Token não informado");
            return;
        }

        // 🔥 Remove Bearer se vier do HTTP reutilizado
        if (token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", "");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const player = await getPlayerById(decoded.id);
        if (!player) throw new Error("Player não encontrado");

        registerPlayer(ws, player);
        console.log("[Auth] Player registrado:", player.id, player.name);
        
        // Busca o player registrado no estado do servidor
        const playerState = getPlayerByIdFromState(player.id);
        
        // Busca pokémons selvagens próximos (range de 20 tiles)
        const wildPokemonsNearby = [];
        if (playerState) {
            const range = 20;
            for (const pokemon of getAllPokemons()) {
                // Ignora pokémons que pertencem a algum player (ownerId existe)
                if (pokemon.ownerId) continue;
                
                // Verifica se está no mesmo andar
                if (pokemon.position.z !== playerState.position.z) continue;
                
                // Calcula distância
                const dx = Math.abs(pokemon.position.x - playerState.position.x);
                const dy = Math.abs(pokemon.position.y - playerState.position.y);
                
                if (Math.max(dx, dy) <= range) {
                    wildPokemonsNearby.push({
                        id: pokemon.id,
                        name: pokemon.name,
                        position: pokemon.position,
                        alive: pokemon.alive,
                        sprite: pokemon.sprite || pokemon.name.toLowerCase()
                    });
                }
            }
        }
        
        console.log(`[Auth] Enviando ${wildPokemonsNearby.length} pokémons selvagens para ${player.name}`);
        
        ws.send(JSON.stringify({
            action: "auth_success",
            player: {
                id: player.id,
                name: player.name,
                level: player.level,
                wildPokemonsNearbyPlayer: wildPokemonsNearby
            }
        }));

    } catch (err) {
        console.error("[Auth] Falha de autenticação:", err.message);
        ws.send(JSON.stringify({
            action: "error",
            message: "Invalid token or player not found."
        }));
    }
}
