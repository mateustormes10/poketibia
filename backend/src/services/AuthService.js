import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAccountByName, createAccount } from "../models/AccountModel.js";

export async function login(username, password) {
    const account = await getAccountByName(username);
    if (!account) {
        return { error: "Conta não encontrada" };
    }

    const valid = await bcrypt.compare(password, account.password);
    if (!valid) {
        return { error: "Senha inválida" };
    }

    const token = jwt.sign(
        { id: account.id, group_id: account.group_id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return { token, account };
}

export async function register(username, password, email) {
    const hashed = await bcrypt.hash(password, 10);
    const id = await createAccount(username, hashed, email);
    return { success: true, accountId: id };
}
