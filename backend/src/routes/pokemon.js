import express from "express";
import {
    listPokemons,
    getPokemon,
    addPokemon,
    editPokemon,
    catchPokemon
} from "../services/PokemonService.js";
import { authMiddleware } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

/* ===== Pokemons ===== */
router.get("/", async (req, res) => {
    res.json(await listPokemons());
});

router.get("/:id", async (req, res) => {
    res.json(await getPokemon(req.params.id));
});

router.post("/", async (req, res) => {
    res.json(await addPokemon(req.body));
});

router.put("/:id", async (req, res) => {
    res.json(await editPokemon(req.params.id, req.body));
});
/* ===== Catch Pokemons ===== */
router.post("/catch", async (req, res) => {
    const { playerId, pokemonId } = req.body;
    const result = await catchPokemon(playerId, pokemonId);
    res.json(result);
});

export default router;
