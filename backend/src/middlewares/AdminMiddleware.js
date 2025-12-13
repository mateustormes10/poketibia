export function adminMiddleware(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: "Não autenticado" });
    }

    // ADMIN = group_id >= 4
    if (req.user.group_id < 4) {
        return res.status(403).json({ error: "Acesso negado" });
    }

    next();
}
