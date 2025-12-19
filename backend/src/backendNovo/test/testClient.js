import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

// Função para logs do player
function logPlayerData(player) {
  console.log("===== PLAYER DATA =====");
  console.log(`ID: ${player.id}`);
  console.log(`Nome: ${player.name}`);
  console.log(`Posição: x=${player.position.x}, y=${player.position.y}, z=${player.position.z}`);
  console.log(`Direção: ${player.direction}`);
  console.log(`Pokémon ativo (solto): ${player.pokemons[player.pokemonSolto - 1]?.name}`);
  console.log("Pokémons do player:");
  player.pokemons.forEach(p => {
    console.log(`  - ${p.name} (x:${p.x}, y:${p.y}, dir:${p.direction})`);
  });
  console.log("Wild Pokémons próximos (IDs):", player.wildPokemonsNearbyPlayer);
}

// Função para criar mini mapa 10x10
function createMiniMap(player, mapData) {
  const startX = Math.max(player.position.x - 5, 0);
  const startY = Math.max(player.position.y - 5, 0);
  const mini = mapData.slice(0, 10).map(row => row.slice(0, 10));
  return mini.map((row, y) =>
      row.map((tile, x) => {
        const globalX = startX + x;
        const globalY = startY + y;
        if (globalX === player.position.x && globalY === player.position.y) return "@"; // player
        return tile.includes("SPAWN") ? "P" : ".";
      }).join("")
  ).join("\n");
}

// Quando conecta
ws.on("open", () => {
  console.log("[TESTE] Conectado ao servidor");

  // 1️⃣ Conectar o player
  ws.send(JSON.stringify({
    action: "connect",
    playerId: "player123",
    payload: {
      name: "AshKetchum",
      position: { x: 10, y: 10, z: 1 },
      pokemons: [
        { id: "p1", name: "Pikachu", x: 10, y: 10, direction: "down" },
        { id: "p2", name: "Raichu", x: 10, y: 10, direction: "down" }
      ]
    }
  }));

  // 2️⃣ Solicitar dados do player após 1s
  setTimeout(() => {
    ws.send(JSON.stringify({
      action: "getPlayer",
      playerId: "player123"
    }));
  }, 1000);

  // 3️⃣ Teste de movimento após 2s
  setTimeout(() => {
    ws.send(JSON.stringify({
      action: "move",
      playerId: "player123",
      payload: { x: 12, y: 12, direction: "up" }
    }));
  }, 2000);
});

// Recebimento de mensagens
ws.on("message", (message) => {
  const msg = JSON.parse(message);

  switch (msg.action) {
    case "playerConnected":
      console.log("[RECEBIDO] Player conectado com sucesso");
      logPlayerData(msg.data);
      break;

    case "playerData":
      console.log("[RECEBIDO] Dados do player");
      logPlayerData(msg.data);

      if (msg.data.mapNearbyPlayer?.length > 0) {
        const miniMap = createMiniMap(msg.data, msg.data.mapNearbyPlayer);
        console.log("[MINI-MAPA 10x10]\n" + miniMap);
      }
      break;

    case "playerMoved":
      console.log("[RECEBIDO] Player se moveu");
      logPlayerData(msg.data);
      break;

    default:
      console.log("[RECEBIDO] Mensagem desconhecida:", msg);
  }
});
