import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não informado" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    const [scheme, token] = parts;

    if (scheme !== "Bearer") {
        return res.status(401).json({ error: "Token mal formatado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Anexa dados do token à request
        req.user = {
            id: decoded.id,
            group_id: decoded.group_id
        };

        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}
