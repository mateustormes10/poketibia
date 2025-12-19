import { registerPokemon } from "./pokemons.js";

export function initTestPokemons() {
    registerPokemon({
        id: 1,
        name: "Pikachu",
        position: { x: 52, y: 52, z: 3 },
        alive: true,
        ownerId: 1
    });

    registerPokemon({
        id: 2,
        name: "Charmander",
        position: { x: 55, y: 55, z: 3 },
        alive: true,
        ownerId: 2
    });

    registerPokemon({
        id: 3,
        name: "Bulbasaur",
        position: { x: 58, y: 58, z: 3 },
        alive: true,
        ownerId: 3
    });
}
