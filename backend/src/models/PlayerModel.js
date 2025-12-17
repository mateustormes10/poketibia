import { query } from "../config/database.js";

export async function getPlayerById(id) {
    const rows = await query(
        "SELECT * FROM players WHERE id = ?",
        [id]
    );
    return rows[0] || null;
}

export async function getPlayerByAccountId(accountId) {
    const rows = await query(
        "SELECT * FROM players WHERE account_id = ?",
        [accountId]
    );
    return rows || null;
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

export async function updatePlayerPosition(id, x, y) {
    await query(
        "UPDATE players SET posx = ?, posy = ? WHERE id = ?",
        [x, y, id]
    );
}

export async function updatePlayerPositionAndSprite(id, x, y, z, spriteId = 'default') {
    await query(
        `UPDATE players
         SET posx = ?, posy = ?, posz = ?, lookaddons = ?
         WHERE id = ?`,
        [x, y, z, spriteId, id]
    );
}


export async function authenticatePlayer(accountId) {
    const rows = await query(
        "SELECT * FROM players WHERE account_id = ? LIMIT 1",
        [accountId]
    );

    return rows[0] || null;
}

