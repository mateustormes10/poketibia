import { query } from "../config/database.js";

export async function banPlayerModel(playerId, reason) {
    await query("INSERT INTO bans (type, value, active, added, comment) VALUES (0, ?, 1, UNIX_TIMESTAMP(), ?)", [playerId, reason]);
    return { success: true };
}

export async function unbanPlayerModel(playerId) {
    await query("UPDATE bans SET active = 0 WHERE value = ? AND active = 1", [playerId]);
    return { success: true };
}
