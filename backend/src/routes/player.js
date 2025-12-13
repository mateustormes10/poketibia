// src/routes/player.js

import express from "express";
import {
    getPlayer,
    createNewPlayer,
    movePlayer
} from "../services/PlayerService.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

/**
 * Buscar player da account
 */
router.get("/me", async (req, res) => {
    const player = await getPlayer(req.user.id);

    if (!player) {
        return res.status(404).json({ error: "Nenhum personagem criado" });
    }

    res.json(player);
});

/**
 * Criar personagem
 */
router.post("/create", async (req, res) => {
    const { name, townId } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const result = await createNewPlayer(req.user.id, name, townId);
    res.json(result);
});

/**
 * Mover player
 */
router.post("/move", async (req, res) => {
    const { x, y } = req.body;

    if (x === undefined || y === undefined) {
        return res.status(400).json({ error: "x e y são obrigatórios" });
    }

    const player = await getPlayer(req.user.id);

    if (!player) {
        return res.status(404).json({ error: "Player não existe" });
    }

    const result = await movePlayer(player.id, x, y);
    res.json(result);
});

export default router;
