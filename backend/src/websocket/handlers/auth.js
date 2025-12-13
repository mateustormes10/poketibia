import jwt from "jsonwebtoken";
import { getPlayerById } from "../../models/PlayerModel.js";
import { registerPlayer } from "../state/players.js";

export async function handleAuth(ws, data) {
    try {
        let token = data.token;

        if (!token) {
            ws.send(JSON.stringify({
                action: "error",
                message: "Token não informado"
            }));
            return;
        }

        // 🔥 Remove Bearer se vier do HTTP reutilizado
        if (token.startsWith("Bearer ")) {
            token = token.replace("Bearer ", "");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const player = await getPlayerById(decoded.id);
        if (!player) {
            throw new Error("Player não encontrado");
        }

        registerPlayer(ws, player);

        ws.send(JSON.stringify({
            action: "auth_success",
            player: {
                id: player.id,
                name: player.name,
                level: player.level
            }
        }));

    } catch (err) {
        ws.send(JSON.stringify({
            action: "error",
            message: "Invalid token or player not found."
        }));
    }
}
