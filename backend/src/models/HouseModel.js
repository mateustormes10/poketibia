import { query } from "../config/database.js";

const WORLD_ID = 0; // ajuste se usar múltiplos mundos

export async function getHouseById(id) {
    const rows = await query(
        "SELECT * FROM houses WHERE id = ? AND world_id = ?",
        [id, WORLD_ID]
    );

    return rows[0] || null;
}

export async function insertHouseModel(data) {
    const {
        id,
        name,
        town = 0,
        size = 0,
        price = 0,
        rent = 0,
        doors = 0,
        beds = 0,
        tiles = 0,
        guild = 0
    } = data;

    await query(
        `INSERT INTO houses (
            id, world_id, owner, name, town, size, price, rent,
            doors, beds, tiles, guild
        ) VALUES (?, ?, 0, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id,
            WORLD_ID,
            name,
            town,
            size,
            price,
            rent,
            doors,
            beds,
            tiles,
            guild
        ]
    );

    return { success: true };
}

export async function buyHouseModel(playerId, houseId) {
    const house = await getHouseById(houseId);

    if (!house) {
        return { error: "Casa não existe" };
    }

    if (house.owner !== 0) {
        return { error: "Casa já possui dono" };
    }

    const result = await query(
        `UPDATE houses 
         SET owner = ?, paid = UNIX_TIMESTAMP() 
         WHERE id = ? AND world_id = ? AND owner = 0`,
        [playerId, houseId, WORLD_ID]
    );

    if (result.affectedRows === 0) {
        return { error: "Falha ao comprar a casa" };
    }

    return { success: true };
}
