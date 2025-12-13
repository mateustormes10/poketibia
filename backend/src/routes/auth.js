import express from "express";
import { login, register } from "../services/authService.js";

const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const result = await login(username, password);
    res.json(result);
});

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    const result = await register(username, password, email);
    res.json(result);
});

export default router;
