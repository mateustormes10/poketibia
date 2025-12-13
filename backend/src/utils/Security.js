import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SERVER } from "./Constants.js";

export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

export function generateToken(payload, expiresIn = "1d") {
    return jwt.sign(payload, SERVER.JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, SERVER.JWT_SECRET);
    } catch {
        return null;
    }
}
