import { TestClient } from "./TestClient.js";

const tokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBfaWQiOjQsImlhdCI6MTc2NTkwNzYyNCwiZXhwIjoxNzY1OTk0MDI0fQ._wHOakh3pBFlFO_fuc4qreRcBUCioJNvTetQCgbeARM", // substitua pelo token real do Player1
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZ3JvdXBfaWQiOjEsImlhdCI6MTc2NTkxNzg0OSwiZXhwIjoxNzY2MDA0MjQ5fQ.kZEAepwXvdLrXwQAvYVqz-RaoRe4fSh2SYO_dRd3rc4", // substitua pelo token real do Player2
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZ3JvdXBfaWQiOjEsImlhdCI6MTc2NTkxNzg0OSwiZXhwIjoxNzY2MDA0MjQ5fQ.kZEAepwXvdLrXwQAvYVqz-RaoRe4fSh2SYO_dRd3rc4", // substitua pelo token real do Player3
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZ3JvdXBfaWQiOjEsImlhdCI6MTc2NTkxNzg0OSwiZXhwIjoxNzY2MDA0MjQ5fQ.kZEAepwXvdLrXwQAvYVqz-RaoRe4fSh2SYO_dRd3rc4"  // substitua pelo token real do Player4
];

(async () => {
    // Cria os 4 clients
    const clients = tokens.map((token, index) => new TestClient(`Player${index + 1}`, token));

    console.log("=== CONECTANDO WS ===");
    for (const c of clients) {
        await c.connect();
        await c.auth();
    }

    console.log("\n=== TESTES DE MOVIMENTO, CHAT, POKÉMON E COMBATE ===");
    // Exemplo de ações para cada player
    for (let i = 0; i < clients.length; i++) {
        const c = clients[i];
        await c.move(50 + i * 5, 50 + i * 5); // posições diferentes
        await c.chat(`Olá, eu sou ${c.name}!`);
        await c.catchPokemon(4); // todos tentam capturar o Pokémon 4
        if (i < clients.length - 1) {
            await c.attack(clients[i + 1].playerId); // ataca o próximo player
        }
    }

    console.log("\n=== REQUEST ALL PLAYERS ===");
    // Testa request_all_players para todos
    for (const c of clients) {
        await c.requestAllPlayers();
    }

    console.log("\n=== TESTE FINALIZADO ===");
    setTimeout(() => {
        clients.forEach(c => c.close());
    }, 2000);
})();
