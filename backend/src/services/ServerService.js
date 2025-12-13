import { getServerConfigModel, setServerConfigModel } from "../models/ServerModel.js";

export async function getServerConfig() {
    return await getServerConfigModel();
}

export async function setServerConfig(key, value) {
    return await setServerConfigModel(key, value);
}
