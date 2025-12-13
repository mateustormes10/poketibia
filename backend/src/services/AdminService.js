import { banPlayerModel, unbanPlayerModel } from "../models/AdminModel.js";

export async function banPlayer(playerId, reason) {
    return await banPlayerModel(playerId, reason);
}

export async function unbanPlayer(playerId) {
    return await unbanPlayerModel(playerId);
}
