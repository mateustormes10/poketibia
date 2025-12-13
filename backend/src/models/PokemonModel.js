// src/models/PokemonModel.js
import { query } from "../config/database.js";

/* =========================
   POKEMONS
========================= */

// INSERT
export async function createPokemon(data) {
    const {
        name,
        hp,
        max_hp,
        max_mana,
        aggressive,
        speed,
        attack_base,
        defense_base,
        elements,
        weak_elements,
        strong_elements,
        skills,
        sprite_up,
        sprite_down,
        sprite_left,
        sprite_right
    } = data;

    await query(`
        INSERT INTO pokemons (
            name, hp, max_hp, max_mana, aggressive, speed,
            attack_base, defense_base,
            elements, weak_elements, strong_elements, skills,
            sprite_up, sprite_down, sprite_left, sprite_right
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        name, hp, max_hp, max_mana, aggressive, speed,
        attack_base, defense_base,
        JSON.stringify(elements),
        JSON.stringify(weak_elements),
        JSON.stringify(strong_elements),
        JSON.stringify(skills),
        JSON.stringify(sprite_up),
        JSON.stringify(sprite_down),
        JSON.stringify(sprite_left),
        JSON.stringify(sprite_right)
    ]);

    return { success: true };
}

// UPDATE
export async function updatePokemon(id, data) {
    await query(`
        UPDATE pokemons SET
            name = ?,
            hp = ?,
            max_hp = ?,
            max_mana = ?,
            aggressive = ?,
            speed = ?,
            attack_base = ?,
            defense_base = ?,
            elements = ?,
            weak_elements = ?,
            strong_elements = ?,
            skills = ?,
            sprite_up = ?,
            sprite_down = ?,
            sprite_left = ?,
            sprite_right = ?
        WHERE id = ?
    `, [
        data.name,
        data.hp,
        data.max_hp,
        data.max_mana,
        data.aggressive,
        data.speed,
        data.attack_base,
        data.defense_base,
        JSON.stringify(data.elements),
        JSON.stringify(data.weak_elements),
        JSON.stringify(data.strong_elements),
        JSON.stringify(data.skills),
        JSON.stringify(data.sprite_up),
        JSON.stringify(data.sprite_down),
        JSON.stringify(data.sprite_left),
        JSON.stringify(data.sprite_right),
        id
    ]);

    return { success: true };
}

// SELECT ALL
export async function getAllPokemons() {
    return await query("SELECT * FROM pokemons");
}

// SELECT BY ID
export async function getPokemonById(id) {
    const rows = await query("SELECT * FROM pokemons WHERE id = ?", [id]);
    return rows[0] || null;
}

/* ===== Catch Pokemons ===== */
export async function catchPokemonAction(playerId, pokemonId) {
    // Atualiza tabela de pokemons capturados
    await query("INSERT INTO player_pokemons (player_id, pokemon_id) VALUES (?, ?)", [playerId, pokemonId]);
    return { success: true };
}
