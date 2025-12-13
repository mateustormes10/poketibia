import express from "express";
import { getServerConfig, setServerConfig } from "../services/ServerService.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";
import { adminMiddleware } from "../middlewares/AdminMiddleware.js";

const router = express.Router();

// ORDEM CORRETA
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/config", async (req, res) => {
    const config = await getServerConfig();
    res.json(config);
});

router.post("/config", async (req, res) => {
    const { key, value } = req.body;

    if (!key || value === undefined) {
        return res.status(400).json({
            error: "key e value são obrigatórios"
        });
    }

    const result = await setServerConfig(key, value);
    res.json(result);
});

export default router;
