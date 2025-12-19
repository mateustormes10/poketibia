import { TestClient } from "./TestClient.js";




const tokens = [
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBfaWQiOjQsImlhdCI6MTc2NjAwMTc4OSwiZXhwIjoxNzY2MDg4MTg5fQ.mLFPInM1arGRlfs78XO4uvWnjHN2jx1gZ63PNrIAujs",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZ3JvdXBfaWQiOjEsImlhdCI6MTc2NjAwMTgwMywiZXhwIjoxNzY2MDg4MjAzfQ.oueW7Q1Ad4cn244DpLRYIzgH9_0JR9UFxVFZi8BDOD4",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZ3JvdXBfaWQiOjEsImlhdCI6MTc2NjAwMTgxMywiZXhwIjoxNzY2MDg4MjEzfQ.WPyOKdB0uBd1JV1ttIpRuy53IkzojmFbMIsd2NZssWM",
];

(async () => {
    // Cria os clients
    const clients = tokens.map((token, index) => new TestClient(`Player${index + 1}`, token));

    console.log("=== CONECTANDO WS ===");
    for (const c of clients) {
        await c.connect();
        await c.auth();
    }

    console.log("\n=== TESTE DE MOVIMENTO DE PLAYERS ===");
    for (let i = 0; i < clients.length; i++) {
        const c = clients[i];
        await c.move(50 + i * 5, 50 + i * 5); // move players para posições diferentes
    }

    console.log("\n=== TESTE DE COLISÕES ===");
    await clients[0].move(29, 19); // tile bloqueado
    await clients[0].move(15, 15); // tile livre
    await clients[1].move(50, 50); // colisão com Player1 (se estiver no mesmo tile)

    console.log("\n=== TESTE DE CAPTURA DE POKÉMON ===");
    // Player1 tenta capturar o Pokémon 1
    await clients[0].catchPokemon(1);
    // Player2 tenta capturar Pokémon 2
    await clients[1].catchPokemon(2);
    // Player3 tenta capturar Pokémon 3
    await clients[2].catchPokemon(3);

    console.log("\n=== TESTE DE VISUALIZAÇÃO DE POKÉMON ===");
    for (const c of clients) {
        await c.requestAllPokemons(); // pega todos os pokémons visíveis
    }

    console.log("\n=== TESTE DE MOVIMENTO COM SPRITES ===");
    await clients[0].move(63, 63, 3, "36204"); // summonerMale
    await clients[1].move(64, 64, 3, "3474");  // mageMale
    await clients[2].move(65, 65, 3, "14508"); // warriorMale

    console.log("\n=== TESTE FINALIZADO ===");
    setTimeout(() => {
        clients.forEach(c => c.close());
    }, 3000);
})();
