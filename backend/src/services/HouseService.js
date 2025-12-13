import { getHouseById, buyHouseModel, insertHouseModel } from "../models/HouseModel.js";

export async function getHouse(id) {
    return await getHouseById(id);
}

export async function buyHouse(playerId, houseId) {
    return await buyHouseModel(playerId, houseId);
}

export async function createHouse(data) {
    return await insertHouseModel(data);
}