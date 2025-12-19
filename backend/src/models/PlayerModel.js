import { query } from "../config/database.js";

export async function getPlayerById(id) {
    const rows = await query(
        "SELECT * FROM players WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

export async function getPlayerByAccountId(accountId) {
    // Busca todos os players da conta
    const players = await query(
        `SELECT * FROM players WHERE account_id = ?`,
        [accountId]
    );

    if (!players || players.length === 0) return [];

    // Para cada player, busca seus pokemons ativos
    for (const player of players) {
        const activePokemons = await query(
            `SELECT 
                pap.slot, 
                pap.direction, 
                pap.nickname,
                pap.x,
                pap.y,
                p.id AS pokemonId,
                p.name,
                p.hp,
                p.max_hp,
                p.max_mana,
                p.aggressive,
                p.speed,
                p.attack_base,
                p.defense_base,
                p.elements,
                p.weak_elements,
                p.strong_elements,
                p.skills,
                p.sprite_up,
                p.sprite_down,
                p.sprite_left,
                p.sprite_right
             FROM player_active_pokemons pap
             LEFT JOIN pokemons p ON p.id = pap.pokemon_id
             WHERE pap.player_id = ?`,
            [player.id]
        );

        player.activePokemons = activePokemons || [];
    }

    return players;
}




export async function getPlayerByName(name) {
    const rows = await query(
        "SELECT * FROM players WHERE name = ?",
        [name]
    );
    return rows[0] || null;
}

export async function createPlayer({
    accountId,
    name,
    townId = 1
}) {
    const sql = `
        INSERT INTO players (
            name,
            account_id,
            group_id,
            town_id,
            rank_id,
            level,
            vocation,
            health,
            healthmax,
            mana,
            manamax,
            posx,
            posy,
            posz,
            conditions,
            lookaddons
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
        name,           // name
        accountId,      // account_id
        1,              // group_id
        townId,         // town_id
        0,              // rank_id
        1,              // level
        0,              // vocation
        100,            // health
        100,            // healthmax
        100,            // mana
        100,            // manamax
        20,            // posx
        20,            // posy
        3,              // posz
        Buffer.alloc(0), // conditions (BLOB obrigatório)
        "default"
    ];

    const result = await query(sql, params);
    return result.insertId;
}


export async function updatePlayerPosition(id, x, y, z) {
    await query(
        `UPDATE players
         SET posx = ?, posy = ?, posz = ?
         WHERE id = ?`,
        [x, y, z, id]
    );
}

export async function updatePlayerSprite(id, spriteId = 'default') {
    await query(
        `UPDATE players
         SET lookaddons = ?
         WHERE id = ?`,
        [spriteId, id]
    );
}


export async function authenticatePlayer(accountId) {
    const rows = await query(
        "SELECT * FROM players WHERE account_id = ? LIMIT 1",
        [accountId]
    );

    return rows[0] || null;
}

