import express from "express";
import cors from "cors";
import "dotenv/config";

// Rotas
import authRoutes from "./routes/auth.js";
import playerRoutes from "./routes/player.js";
import pokemonRoutes from "./routes/pokemon.js";
import guildRoutes from "./routes/guild.js";
import houseRoutes from "./routes/house.js";
import adminRoutes from "./routes/admin.js";
import serverRoutes from "./routes/server.js";


import "./websocket/index.js";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/player", playerRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/guild", guildRoutes);
app.use("/house", houseRoutes);
app.use("/admin", adminRoutes);
app.use("/server", serverRoutes);

app.get("/", (req, res) => {
    res.send("Backend Pokémon MMO ativo!");
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
