const pokemons = new Map();
// id -> { id, name, position, alive }

let nextId = 1;

export function registerPokemon(pokemon) {
    pokemons.set(pokemon.id, pokemon);
}

export function removePokemon(id) {
    pokemons.delete(id);
}

export function getAllPokemons() {
    return pokemons.values(); // ITERÁVEL
}

export function getPokemon(id) {
    return pokemons.get(id);
}

/**
 * Usado para colisão
 */
export function isPokemonBlocking(x, y, z) {
    for (const mon of pokemons.values()) {
        if (!mon.alive) continue;
        if (mon.position.z !== z) continue;

        if (
            Math.floor(mon.position.x) === x &&
            Math.floor(mon.position.y) === y
        ) {
            return true;
        }
    }
    return false;
}
