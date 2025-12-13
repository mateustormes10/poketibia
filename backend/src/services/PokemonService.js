import {
    getAllPokemons,
    getPokemonById,
    createPokemon,
    updatePokemon
} from "../models/PokemonModel.js";

import {  catchPokemonAction } from "../models/PokemonModel.js";

/* ===== Pokemons ===== */
export async function listPokemons() {
    return await getAllPokemons();
}

export async function getPokemon(id) {
    return await getPokemonById(id);
}

export async function addPokemon(data) {
    return await createPokemon(data);
}

export async function editPokemon(id, data) {
    return await updatePokemon(id, data);
}
/* ===== Catch Pokemons ===== */
export async function catchPokemon(playerId, pokemonId) {
    return await catchPokemonAction(playerId, pokemonId);
}
