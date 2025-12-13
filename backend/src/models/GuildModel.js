import { query } from "../config/database.js";

export async function createGuildModel(name, ownerId) {
    const result = await query(
        "INSERT INTO guilds (name, ownerid, world_id, creationdata) VALUES (?, ?, 0, UNIX_TIMESTAMP())",
        [name, ownerId]
    );
    return result.insertId;
}

export async function getGuildById(id) {
    const rows = await query("SELECT * FROM guilds WHERE id = ?", [id]);
    return rows[0] || null;
}
