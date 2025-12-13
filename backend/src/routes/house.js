import express from "express";
import { getHouse, buyHouse, createHouse } from "../services/HouseService.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

/**
 * Buscar house
 */
router.get("/:id", async (req, res) => {
    const house = await getHouse(req.params.id);

    if (!house) {
        return res.status(404).json({ error: "Casa não encontrada" });
    }

    res.json(house);
});

/**
 * Comprar casa
 * playerId vem do token, NÃO do body
 */
router.post("/buy", async (req, res) => {
    const { houseId } = req.body;

    if (!houseId) {
        return res.status(400).json({ error: "houseId é obrigatório" });
    }

    const playerId = req.user.playerId || req.user.id;

    const result = await buyHouse(playerId, houseId);

    if (result.error) {
        return res.status(400).json(result);
    }

    res.json(result);
});
/**
 * Criar house (ADMIN)
 */
router.post("/create", async (req, res) => {
    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({
            error: "id e name são obrigatórios"
        });
    }

    const result = await createHouse(req.body);
    res.json(result);
});

export default router;
