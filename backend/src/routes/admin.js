import express from "express";
import { banPlayer, unbanPlayer } from "../services/AdminService.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../middlewares/AdminMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/ban", async (req, res) => {
    const { playerId, reason } = req.body;
    const result = await banPlayer(playerId, reason);
    res.json(result);
});

router.post("/unban", async (req, res) => {
    const { playerId } = req.body;
    const result = await unbanPlayer(playerId);
    res.json(result);
});

export default router;
