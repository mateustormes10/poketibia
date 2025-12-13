import express from "express";
import { createGuild, getGuild } from "../services/GuildService.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/create", async (req, res) => {
    const { name, ownerId } = req.body;
    const guild = await createGuild(name, ownerId);
    res.json(guild);
});

router.get("/:id", async (req, res) => {
    const guild = await getGuild(req.params.id);
    res.json(guild);
});

export default router;
