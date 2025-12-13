import { createGuildModel, getGuildById } from "../models/GuildModel.js";

export async function createGuild(name, ownerId) {
    const id = await createGuildModel(name, ownerId);
    return { success: true, guildId: id };
}

export async function getGuild(id) {
    return await getGuildById(id);
}
