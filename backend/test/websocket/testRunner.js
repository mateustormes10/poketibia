import { TestClient } from "./TestClient.js";

(async () => {
    const client = new TestClient("Player1", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBfaWQiOjQsImlhdCI6MTc2NTY0NzExMywiZXhwIjoxNzY1NzMzNTEzfQ.jLeIv8kY8bQyMdCPPYHg92kg-67gjzXXUweyY-dsilQ");
    await client.connect();
    await client.auth();
    await client.move(50, 50);
    await client.chat("Teste WS funcionando!");
    await client.catchPokemon(4);
    await client.attack(2);
    client.close();
})();
