import { query } from "../config/database.js";

export async function getServerConfigModel() {
    const rows = await query("SELECT * FROM server_config");
    return rows;
}

export async function setServerConfigModel(key, value) {
    await query("INSERT INTO server_config (config, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?", [key, value, value]);
    return { success: true };
}
