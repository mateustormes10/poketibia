import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("[TESTE MAP] Conectado ao servidor");

  // 🔹 1️⃣ Conecta o player
  ws.send(JSON.stringify({
    action: "connect",
    playerId: "player123",
    payload: { name: "TestPlayer", pokemons: [],
      position: { x: 10, y: 10, z: 1 } // posição inicial
      }
  }));
});

ws.on("message", (message) => {
  const msg = JSON.parse(message);

  if (msg.action === "playerConnected") {
    console.log("[RECEBIDO] Player conectado, movendo para x=30, y=20, z=3");

    // 🔹 2️⃣ Move o player para testar mapa
    ws.send(JSON.stringify({
      action: "move",
      playerId: "player123",
      payload: { x: 30, y: 20, z: 3 }
    }));
  } else if (msg.action === "playerMoved") {
    const player = msg.data;
    const mapData = player.mapNearbyPlayer;

    console.log("\n[DEBUG MAP] Player posição:", player.position);
    console.log("[DEBUG MAP] Área 10x10 em volta do player:\n");

    // 🔹 Criando mini-mapa 10x10
    const startX = Math.max(player.position.x - 5, 0);
    const startY = Math.max(player.position.y - 5, 0);

    for (let y = 0; y < 10; y++) {
      let row = "";
      for (let x = 0; x < 10; x++) {
        const tile = mapData[startY + y]?.[startX + x] || " ";
        row += tile === "S" ? "." : tile; // "." para chão vazio, mantém outros tiles
        if (player.position.x === startX + x && player.position.y === startY + y) {
          row = row.slice(0, -1) + "@"; // Marca posição do player
        }
      }
      console.log(row);
    }

    ws.close();
  }
});
