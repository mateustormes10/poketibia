
import { query } from "../config/database.js";

export async function getAccountByName(name) {
    const rows = await query("SELECT * FROM accounts WHERE name = ?", [name]);
    return rows[0] || null;
}

export async function createAccount(name, password, email) {
    const result = await query(
        "INSERT INTO accounts (name, password, email) VALUES (?, ?, ?)",
        [name, password, email]
    );
    return result.insertId;
}
