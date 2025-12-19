import WebSocket, { WebSocketServer } from "ws";
import fs from "fs";
import path from "path";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server rodando na porta ${PORT}`);

// ---------- Game state em memória ----------
const gameState = {
  players: {
    // "1": {
    //   id: "1",
    //   name: "AshKetchum",
    //   position: { x: 32, y: 21, z: 3 },
    //   direction: "left",
    //   sprite: "summonerMale",
    //   level: 1,
    //   speed: 1,
    //   pokemonSolto: 1,
    //   pokemons: [
    //     { id: "p1", name: "Pikachu", x: 238, y: 340, direction: "left" },
    //     { id: "p2", name: "Raichu", x: 239, y: 340, direction: "right" },
    //     { id: "p3", name: "Charmander", x: 240, y: 340, direction: "up" },
    //     { id: "p4", name: "Squirtle", x: 238, y: 340, direction: "left" },
    //     { id: "p5", name: "Staryu", x: 239, y: 340, direction: "down" },
    //     { id: "p6", name: "Charizard", x: 240, y: 340, direction: "left" }
    //   ],
    //   wildPokemonsNearbyPlayer: ["wild1", "wild2"],
    //   mapNearbyPlayer: [],
    //     nearbyPlayers: {
    //     "2": {
    //       id: "2",
    //       name: "Mateoi",
    //       position: { x: 30, y: 21, z: 3 },
    //       direction: "left",
    //       sprite: "warriorMale"
    //     }
    //   }
    // },
    // "2": {
    //   id: "2",
    //   name: "mateoi",
    //   position: { x: 21, y: 21, z: 3 },
    //   direction: "up",
    //   sprite: "warriorMale",
    //   level: 1,
    //   speed: 1,
    //   pokemonSolto: 2,
    //   pokemons: [
    //     { id: "p1", name: "Pikachu", x: 238, y: 340, direction: "left" },
    //     { id: "p2", name: "Raichu", x: 239, y: 340, direction: "right" },
    //     { id: "p3", name: "Charmander", x: 240, y: 340, direction: "up" },
    //     { id: "p4", name: "Squirtle", x: 238, y: 340, direction: "left" },
    //     { id: "p5", name: "Staryu", x: 239, y: 340, direction: "down" },
    //     { id: "p6", name: "Charizard", x: 240, y: 340, direction: "left" }
    //   ],
    //   wildPokemonsNearbyPlayer: ["wild1", "wild2"],
    //   mapNearbyPlayer: []
    // },
    // "3": {
    //   id: "3",
    //   name: "luiza",
    //   position: { x: 29, y: 22, z: 3 },
    //   direction: "up",
    //   sprite: "warriorMale",
    //   level: 1,
    //   speed: 1,
    //   pokemonSolto: 2,
    //   pokemons: [
    //     { id: "p1", name: "Pikachu", x: 238, y: 340, direction: "left" },
    //     { id: "p2", name: "Raichu", x: 239, y: 340, direction: "right" },
    //     { id: "p3", name: "Charmander", x: 240, y: 340, direction: "up" },
    //     { id: "p4", name: "Squirtle", x: 238, y: 340, direction: "left" },
    //     { id: "p5", name: "Staryu", x: 239, y: 340, direction: "down" },
    //     { id: "p6", name: "Charizard", x: 240, y: 340, direction: "left" }
    //   ],
    //   wildPokemonsNearbyPlayer: ["wild1", "wild2"],
    //   mapNearbyPlayer: []
    // },
    // "4": {
    //   id: "4",
    //   name: "lucas",
    //   position: { x: 29, y: 23, z: 3 },
    //   direction: "up",
    //   sprite: "warriorMale",
    //   level: 1,
    //   speed: 1,
    //   pokemonSolto: 2,
    //   pokemons: [
    //     { id: "p1", name: "Pikachu", x: 238, y: 340, direction: "left" },
    //     { id: "p2", name: "Raichu", x: 239, y: 340, direction: "right" },
    //     { id: "p3", name: "Charmander", x: 240, y: 340, direction: "up" },
    //     { id: "p4", name: "Squirtle", x: 238, y: 340, direction: "left" },
    //     { id: "p5", name: "Staryu", x: 239, y: 340, direction: "down" },
    //     { id: "p6", name: "Charizard", x: 240, y: 340, direction: "left" }
    //   ],
    //   wildPokemonsNearbyPlayer: ["wild1", "wild2"],
    //   mapNearbyPlayer: []
    // }
  },

  wildPokemons: {
    "wild1": { id: "wild1", name: "Pikachu", position: { x: 33, y: 23, z: 3 }, sprite: "pikachu", direction: "left", hp: 100, maxHp: 100, level: 5, isWild: true, ownerId: null },
    "wild2": { id: "wild2", name: "Charmander", position: { x: 35, y: 25, z: 3 }, sprite: "charmander", direction: "up", hp: 80, maxHp: 80, level: 5, isWild: true, ownerId: null },
    "wild3": { id: "wild3", name: "Squirtle", position: { x: 28, y: 28, z: 3 }, sprite: "squirtle", direction: "down", hp: 90, maxHp: 90, level: 5, isWild: true, ownerId: null },
    "wild4": { id: "wild4", name: "Bulbasaur", position: { x: 25, y: 20, z: 3 }, sprite: "bulbasaur", direction: "right", hp: 85, maxHp: 85, level: 5, isWild: true, ownerId: null }
  },

  serverInfo: {
    xp: 1,
    rateSpawn: 160,
    taxFrame: 100,
    urlHost: "http://localhost:8080",
    user: "root",
    password: "",
    nameServer: "Ot poke Lol",
    msgBemvindo: "Bem - vindo xD",
    maps: {
      andar1: { name_file: "map_z1.txt", andar: 1, mapMaxX: 500, mapMaxY: 500, value: [] },
      andar2: { name_file: "map_z2.txt", andar: 2, mapMaxX: 500, mapMaxY: 500, value: [] },
      andar3: { name_file: "map_z3.txt", andar: 3, mapMaxX: 500, mapMaxY: 500, value: [] },
      andar4: { name_file: "map_z4.txt", andar: 4, mapMaxX: 500, mapMaxY: 500, value: [] },
      andar5: { name_file: "map_z5.txt", andar: 5, mapMaxX: 500, mapMaxY: 500, value: [] }
    }
  }
};

// ---------- Quando o player se conecta, adiciona ele ----------
function addPlayerOnline(playerData) {
  if (!gameState.players[playerData.id]) {
    gameState.players[playerData.id] = {
      id: playerData.id,
      name: playerData.name,
      position: playerData.position,
      direction: playerData.direction || "down",
      sprite: playerData.sprite || "summonerMale",
      level: playerData.level || 1,
      speed: playerData.speed || 1,
      pokemonSolto: playerData.pokemonSolto || 1,
      pokemons: playerData.pokemons || [],
      hp: playerData.hp || 100,
      maxHp: playerData.maxHp || 100,
      wildPokemonsNearbyPlayer: [],
      mapNearbyPlayer: [],
      nearbyPlayers: {}
    };
  }
}

// ---------- Remove player quando desconecta ----------
function removePlayerOnline(playerId) {
  delete gameState.players[playerId];
}

// ---------- Calcula jogadores próximos apenas online ----------
function calculateNearbyPlayers(currentPlayer) {
  const range = 10;
  const nearby = {};

  for (const otherId in gameState.players) {
    if (otherId === currentPlayer.id) continue;
    const other = gameState.players[otherId];

    if (other.position.z !== currentPlayer.position.z) continue;
    const dist = Math.abs(other.position.x - currentPlayer.position.x) +
                 Math.abs(other.position.y - currentPlayer.position.y);

    if (dist <= range) {
      nearby[otherId] = {
        id: other.id,
        name: other.name,
        position: { ...other.position },
        direction: other.direction,
        sprite: other.sprite,
        level: other.level,
        speed: other.speed,
        pokemonSolto: other.pokemonSolto,
        pokemons: other.pokemons.map(p => ({ ...p }))
      };
    }
  }

  return nearby;
}

// ---------- Carrega mapas na memória ----------
for (const key in gameState.serverInfo.maps) {
  const mapInfo = gameState.serverInfo.maps[key];
  const filePath = path.join("./assets", mapInfo.name_file);
  console.log("Mapa carregado: "+mapInfo.name_file, fs.existsSync(filePath));
  if (fs.existsSync(filePath)) {
    const lines = fs.readFileSync(filePath, "utf-8").split("\n");
    mapInfo.value = lines.map(line => line.trim().split(" "));
  } else {
    console.warn(`Arquivo do mapa não encontrado: ${filePath}, gerando mapa vazio.`);
    mapInfo.value = Array(mapInfo.mapMaxY).fill().map(() => Array(mapInfo.mapMaxX).fill("S"));
  }
}

// ---------- Funções utilitárias ----------
const wsClients = new Map();

function calculateWildsNearby(player) {
  const range = 20;
  const nearby = [];
  for (const wildId in gameState.wildPokemons) {
    const w = gameState.wildPokemons[wildId];
    
    // Suporta ambos os formatos: position:{x,y,z} ou x,y,z separados
    const pokemonX = w.position?.x ?? w.x;
    const pokemonY = w.position?.y ?? w.y;
    const pokemonZ = w.position?.z ?? w.z;
    
    if (pokemonZ !== player.position.z) continue;
    const dist = Math.abs(pokemonX - player.position.x) + Math.abs(pokemonY - player.position.y);
    if (dist <= range) {
      nearby.push({
        id: w.id,
        name: w.name,
        position: { x: pokemonX, y: pokemonY, z: pokemonZ },
        sprite: w.sprite || w.name.toLowerCase(),
        direction: w.direction,
        hp: w.hp,
        maxHp: w.maxHp || w.hp || 100,
        level: w.level || 1,
        isWild: w.isWild !== false,
        ownerId: w.ownerId ?? null
      });
    }
  }
  return nearby;
}

function getPlayerMapNearby(player) {
  const mapLayer = gameState.serverInfo.maps[`andar${player.position.z}`];
  if (!mapLayer) return [];

  const size = 20; // 10 blocos de cada lado => 20x20
  const { x, y } = player.position;
  const startX = Math.max(0, x - size);
  const startY = Math.max(0, y - size);
  const endX = Math.min(mapLayer.mapMaxX, x + size);
  const endY = Math.min(mapLayer.mapMaxY, y + size);

  const nearby = [];
  for (let row = startY; row < endY; row++) {
    const line = [];
    for (let col = startX; col < endX; col++) {
      line.push(mapLayer.value[row][col]);
    }
    nearby.push(line);
  }
  return nearby;
}

function getPlayerData(playerId) {
  const player = gameState.players[playerId];
  if (!player) return null;

  player.wildPokemonsNearbyPlayer = calculateWildsNearby(player);
  console.log(`[SERVER] 🐾 Player ${player.name} em (${player.position.x},${player.position.y},${player.position.z}): ${player.wildPokemonsNearbyPlayer.length} pokémons selvagens próximos`);
  player.wildPokemonsNearbyPlayer.forEach(wp => {
    console.log(`  - ${wp.name} em (${wp.position.x},${wp.position.y},${wp.position.z}) | isWild: ${wp.isWild} | ownerId: ${wp.ownerId || 'null'}`);
  });
  
  console.log(`[SERVER] 📤 Enviando wildPokemonsNearbyPlayer:`, JSON.stringify(player.wildPokemonsNearbyPlayer));
  
  player.mapNearbyPlayer = getPlayerMapNearby(player);
  player.nearbyPlayers = calculateNearbyPlayers(player);
  
  // Adiciona activePokemon aos dados do player
  const activePokemon = player.pokemons[player.pokemonSolto - 1];
  if (activePokemon) {
    activePokemon.direction = player.direction;
    player.activePokemon = {
      id: activePokemon.id || null,
      name: activePokemon.name,
      sprite: activePokemon.sprite,
      direction: activePokemon.direction,
      hp: activePokemon.hp || 100,
      maxHp: activePokemon.maxHp || 100,
      level: activePokemon.level || 1
    };
  }

  return player;
}

function sendToClient(ws, data) {
  ws.send(JSON.stringify(data));
}

// ---------- Sistema de IA para pokémons selvagens ----------
function findNearestTarget(wildPokemon) {
  let nearestTarget = null;
  let minDistance = 6; // Máximo 5 tiles + 1 para verificação
  
  // Procura por pokémons de players
  for (const playerId in gameState.players) {
    const player = gameState.players[playerId];
    if (player.position.z !== wildPokemon.position.z) continue;
    
    // Verifica pokémons do player
    for (const wildId in gameState.wildPokemons) {
      const w = gameState.wildPokemons[wildId];
      if (!w.ownerId || w.ownerId !== player.id) continue;
      if (w.position.z !== wildPokemon.position.z) continue;
      if (w.hp <= 0) continue;
      
      const dist = Math.abs(w.position.x - wildPokemon.position.x) + Math.abs(w.position.y - wildPokemon.position.y);
      if (dist < minDistance) {
        minDistance = dist;
        nearestTarget = { type: 'pokemon', target: w, playerId: player.id };
      }
    }
    
    // Se não tem pokémon do player próximo, ataca o próprio player
    if (!nearestTarget) {
      const dist = Math.abs(player.position.x - wildPokemon.position.x) + Math.abs(player.position.y - wildPokemon.position.y);
      if (dist < minDistance) {
        minDistance = dist;
        nearestTarget = { type: 'player', target: player, playerId: player.id };
      }
    }
  }
  
  return nearestTarget;
}

function moveWildPokemonTowards(wildPokemon, targetX, targetY) {
  const dx = targetX - wildPokemon.position.x;
  const dy = targetY - wildPokemon.position.y;
  
  let newX = wildPokemon.position.x;
  let newY = wildPokemon.position.y;
  let direction = wildPokemon.direction;
  
  // Prioriza movimento no eixo com maior distância
  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 0) { newX++; direction = 3; } // right
    else { newX--; direction = 1; } // left
  } else if (dy !== 0) {
    if (dy > 0) { newY++; direction = 0; } // down
    else { newY--; direction = 2; } // up
  }
  
  // Verifica se a posição está ocupada
  for (const otherId in gameState.wildPokemons) {
    const other = gameState.wildPokemons[otherId];
    if (other.id === wildPokemon.id) continue;
    if (other.position.x === newX && other.position.y === newY && other.position.z === wildPokemon.position.z) {
      return false; // Posição ocupada
    }
  }
  
  wildPokemon.position.x = newX;
  wildPokemon.position.y = newY;
  wildPokemon.direction = direction;
  return true;
}

function wildPokemonAttack(wildPokemon, target, targetType) {
  const damage = 10 + Math.floor(Math.random() * 10); // 10-20 de dano
  target.hp = Math.max(0, (target.hp || 100) - damage);
  
  console.log(`⚔️ ${wildPokemon.name} atacou ${target.name} causando ${damage} de dano! HP restante: ${target.hp}`);
  
  return {
    attackerId: wildPokemon.id,
    targetId: target.id,
    targetType,
    damage,
    newHp: target.hp,
    died: target.hp <= 0
  };
}

function updateWildPokemonsAI() {
  const updates = [];
  
  for (const wildId in gameState.wildPokemons) {
    const wildPokemon = gameState.wildPokemons[wildId];
    
    // Ignora pokémons que pertencem a players ou estão mortos
    if (wildPokemon.ownerId || wildPokemon.hp <= 0) continue;
    
    const targetInfo = findNearestTarget(wildPokemon);
    
    if (targetInfo) {
      const target = targetInfo.target;
      const dist = Math.abs(target.position.x - wildPokemon.position.x) + Math.abs(target.position.y - wildPokemon.position.y);
      
      // Se está adjacente (dist 1), ataca
      if (dist <= 1) {
        const attackResult = wildPokemonAttack(wildPokemon, target, targetInfo.type);
        updates.push({
          type: 'attack',
          data: attackResult
        });
        
        // Se matou o alvo
        if (target.hp <= 0) {
          if (targetInfo.type === 'pokemon') {
            // Remove pokémon do player
            delete gameState.wildPokemons[target.id];
            updates.push({
              type: 'pokemonDied',
              data: { pokemonId: target.id, ownerId: target.ownerId }
            });
          } else if (targetInfo.type === 'player') {
            // Player morreu
            updates.push({
              type: 'playerDied',
              data: { playerId: target.id }
            });
          }
        }
      }
      // Se está a 2-5 tiles, move em direção ao alvo
      else if (dist <= 5) {
        const moved = moveWildPokemonTowards(wildPokemon, target.position.x, target.position.y);
        if (moved) {
          updates.push({
            type: 'movement',
            data: {
              pokemonId: wildPokemon.id,
              position: { ...wildPokemon.position },
              direction: wildPokemon.direction
            }
          });
        }
      }
    }
  }
  
  return updates;
}

// Inicia loop de IA dos pokémons selvagens (1 vez por segundo)
setInterval(() => {
  const updates = updateWildPokemonsAI();
  
  if (updates.length > 0) {
    // Broadcast das atualizações para todos os clientes
    for (const clientWs of wsClients.keys()) {
      try {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify({
            action: 'wildPokemonUpdates',
            updates
          }));
        }
      } catch (e) {}
    }
  }
}, 1000);

// ---------- Log inicial dos pokémons selvagens ----------
console.log("\n🌍 Pokémons selvagens iniciais no servidor:");
for (const wildId in gameState.wildPokemons) {
  const w = gameState.wildPokemons[wildId];
  const posX = w.position?.x ?? w.x;
  const posY = w.position?.y ?? w.y;
  const posZ = w.position?.z ?? w.z;
  console.log(`  - ${w.name} (${wildId}) em (${posX},${posY},${posZ}) | isWild: ${w.isWild}`);
}
console.log("");

// ---------- WebSocket events ----------
wss.on("connection", (ws) => {
    console.log("Novo cliente conectado");

    ws.on("message", (message) => {
    try {
      const msg = JSON.parse(message);
      const { action, playerId, payload } = msg;

      switch(action) {
        case "connect":  // NOVO CASE
          if (!playerId) {
            sendToClient(ws, { error: "PlayerId é necessário para conectar" });
            return;
          }
          // Adiciona player se ainda não estiver online
          addPlayerOnline({
            id: playerId,
            name: payload?.name || `Player${playerId}`,
            speed: payload?.speed,
            pokemonSolto: payload?.pokemonSolto,
            direction: payload?.direction,
            level: payload?.level,
            position: payload?.position,
            sprite: payload?.sprite,
            pokemons: payload?.pokemons || []
          });

          wsClients.set(ws, playerId);
          console.log(`Player ${playerId} conectou.`);

          // Retorna dados do player para o cliente
          sendToClient(ws, { action: "playerConnected", data: getPlayerData(playerId) });
          break;

        case "getPlayer":
          if (!gameState.players[playerId]) {
            sendToClient(ws, { error: "Player não está conectado" });
            return;
          }
          sendToClient(ws, { action: "playerData", data: getPlayerData(playerId) });
          break;

        case "move":
          if (!gameState.players[playerId]) return;
          const player = gameState.players[playerId];
          const { x, y, z, direction } = payload;
          if (x !== undefined) player.position.x = x;
          if (y !== undefined) player.position.y = y;
          if (z !== undefined) player.position.z = z;
          if (direction) player.direction = direction;

          console.log("[SERVER] Player", player.id, "move para", x, y);

          // Não manipula posição do pokémon - isso é responsabilidade do cliente renderizar
          const activePokemon = player.pokemons[player.pokemonSolto - 1];
          if (activePokemon) {
            activePokemon.direction = player.direction;
          }

          // responde ao cliente que solicitou o movimento (dados completos do jogador)
          sendToClient(ws, { action: "playerMoved", data: getPlayerData(playerId) });

          // BROADCAST: notifica os demais clientes sobre este jogador (dados leves)
          const broadcastPayload = {
            action: "playerBroadcastMoved",
            player: {
              id: player.id,
              name: player.name,
              position: { ...player.position },
              direction: player.direction,
              sprite: player.sprite,
              level: player.level,
             // envia info do pokemon ativo para que os clientes possam mover o follower localmente
             activePokemon: activePokemon ? {
               id: activePokemon.id || null,
               name: activePokemon.name,
               sprite: activePokemon.sprite,
               x: activePokemon.x,
               y: activePokemon.y,
               z: player.position.z,
               ownerId: player.id
             } : null
            }
          };

          for (const clientWs of wsClients.keys()) {
            if (clientWs === ws) continue; // já respondeu ao mover
            try {
              if (clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify(broadcastPayload));
              }
            } catch (e) {
              // ignore send errors
            }
          }

          break;

        case "teleport":
          {
            if (!gameState.players[playerId]) return;
            const player = gameState.players[playerId];
            const { x, y, z } = payload || {};
            if (x !== undefined) player.position.x = Number(x);
            if (y !== undefined) player.position.y = Number(y);
            if (z !== undefined) player.position.z = Number(z);

            // atualiza pokemon ativo (se houver) para seguir o player
            const activePokemon = player.pokemons[player.pokemonSolto - 1];
            if (activePokemon) {
              activePokemon.direction = player.direction;
            }

            // responde ao cliente que solicitou o teleport com os dados atualizados
            sendToClient(ws, { action: "playerMoved", data: getPlayerData(playerId) });

            // broadcast para os demais clientes sobre o movimento/teleport
            const broadcastPayload = {
              action: "playerBroadcastMoved",
              player: {
                id: player.id,
                name: player.name,
                position: { ...player.position },
                direction: player.direction,
                sprite: player.sprite,
                level: player.level,
                activePokemon: activePokemon ? {
                  id: activePokemon.id || null,
                  name: activePokemon.name,
                  sprite: activePokemon.sprite,
                  x: activePokemon.x,
                  y: activePokemon.y,
                  z: player.position.z,
                  ownerId: player.id
                } : null
              }
            };

            for (const clientWs of wsClients.keys()) {
              if (clientWs === ws) continue;
              try {
                if (clientWs.readyState === WebSocket.OPEN) clientWs.send(JSON.stringify(broadcastPayload));
              } catch (e) {}
            }
          }
          break;

        case "spawnPokemon":
          {
            console.log(`[SERVER] 📥 Spawn request de player ${playerId}:`, payload?.pokemon);
            if (!gameState.players[playerId]) {
              console.log(`[SERVER] ❌ Player ${playerId} não encontrado no gameState`);
              return;
            }
            const player = gameState.players[playerId];
            const p = payload?.pokemon || {};
            
            // Remove pokémon anterior do mesmo owner
            const oldPokemonIds = Object.keys(gameState.wildPokemons).filter(
              key => gameState.wildPokemons[key].ownerId === playerId
            );
            oldPokemonIds.forEach(oldId => {
              console.log(`[SERVER] 🔄 Removendo pokémon anterior: ${gameState.wildPokemons[oldId].name} (${oldId})`);
              delete gameState.wildPokemons[oldId];
            });
            
            const id = `wild_${Date.now()}_${Math.floor(Math.random()*999)}`;
            // Spawna o pokémon 1 tile à frente do player (baseado na direção)
            let spawnX = player.position.x;
            let spawnY = player.position.y;
            
            // Ajusta posição baseado na direção do player (0=down, 1=left, 2=up, 3=right)
            switch(player.direction) {
              case 0: spawnY += 1; break; // down
              case 1: spawnX -= 1; break; // left
              case 2: spawnY -= 1; break; // up
              case 3: spawnX += 1; break; // right
              default: spawnX += 1; // fallback: direita
            }
            
            const spawn = {
              id,
              name: p.name || "Wild",
              sprite: p.sprite || 0,
              element: p.element || "normal",
              position: { x: spawnX, y: spawnY, z: player.position.z },
              ownerId: playerId, // marca quem soltou
              hp: p.hp || 100,
              maxHp: p.maxHp || p.hp || 100,
              level: p.level || 1,
              isWild: false
            };
            gameState.wildPokemons[id] = spawn;
            console.log(`[SERVER] ✅ Pokémon ${spawn.name} spawned em (${spawn.position.x},${spawn.position.y}). Total wild: ${Object.keys(gameState.wildPokemons).length}`);
            // responde ao solicitante
            sendToClient(ws, { action: "spawned", data: spawn });
            // broadcast para todos
            const bc = { action: "spawnBroadcast", pokemon: spawn };
            for (const clientWs of wsClients.keys()) {
              try { if (clientWs.readyState === WebSocket.OPEN) clientWs.send(JSON.stringify(bc)); } catch (e) {}
            }
            console.log(`[SERVER] 📤 Broadcast enviado para ${wsClients.size} clientes`);
          }
          break;

        case "recallPokemon":
          {
            console.log(`[SERVER] 🔙 Recall request de player ${playerId}`);
            if (!gameState.players[playerId]) {
              console.log(`[SERVER] ❌ Player ${playerId} não encontrado no gameState`);
              return;
            }
            
            // Remove pokémon do owner
            const removedIds = [];
            for (const pokemonId in gameState.wildPokemons) {
              if (gameState.wildPokemons[pokemonId].ownerId === playerId) {
                removedIds.push(pokemonId);
                delete gameState.wildPokemons[pokemonId];
              }
            }
            
            if (removedIds.length > 0) {
              console.log(`[SERVER] ✅ Pokémons removidos: ${removedIds.join(', ')}`);
              
              // Broadcast para todos os clientes removerem o pokemon
              const bc = { action: "recallBroadcast", playerId, removedIds };
              for (const clientWs of wsClients.keys()) {
                try { 
                  if (clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(JSON.stringify(bc)); 
                  }
                } catch (e) {}
              }
            }
          }
          break;

        case "spawnWildPokemon":
          {
            console.log(`[SERVER] 🌿 Spawn de Pokemon selvagem request de player ${playerId}`);
            if (!gameState.players[playerId]) {
              console.log(`[SERVER] ❌ Player ${playerId} não encontrado no gameState`);
              return;
            }
            const player = gameState.players[playerId];
            
            // Spawna Pikachu selvagem em posição aleatória próxima ao player (3-5 tiles de distância)
            const distance = 3 + Math.floor(Math.random() * 3); // 3 a 5 tiles
            const angle = Math.random() * Math.PI * 2;
            const spawnX = Math.round(player.position.x + Math.cos(angle) * distance);
            const spawnY = Math.round(player.position.y + Math.sin(angle) * distance);
            
            const wildId = `wild_${Date.now()}_${Math.floor(Math.random()*999)}`;
            const wildPokemon = {
              id: wildId,
              name: "Pikachu",
              sprite: 0,
              element: "electric",
              position: { x: spawnX, y: spawnY, z: player.position.z },
              ownerId: null, // selvagem não tem dono
              hp: 100,
              maxHp: 100,
              level: 5,
              isWild: true
            };
            
            gameState.wildPokemons[wildId] = wildPokemon;
            console.log(`[SERVER] ✅ Pokemon selvagem ${wildPokemon.name} spawned em (${wildPokemon.position.x},${wildPokemon.position.y}). Total wild: ${Object.keys(gameState.wildPokemons).length}`);
            
            // Broadcast para todos os clientes
            const bc = { action: "spawnBroadcast", pokemon: wildPokemon };
            for (const clientWs of wsClients.keys()) {
              try { 
                if (clientWs.readyState === WebSocket.OPEN) {
                  clientWs.send(JSON.stringify(bc)); 
                }
              } catch (e) {}
            }
            console.log(`[SERVER] 📤 Broadcast de wild pokemon enviado para ${wsClients.size} clientes`);
          }
          break;

        case "attackPokemon":
          {
            console.log(`[SERVER] ⚔️ Attack request de player ${playerId}`);
            const targetId = payload?.targetId;
            const damage = payload?.damage || 10;
            const skillName = payload?.skillName || "Ataque";
            
            if (!targetId || !gameState.wildPokemons[targetId]) {
              console.log(`[SERVER] ❌ Target ${targetId} não encontrado`);
              return;
            }
            
            const target = gameState.wildPokemons[targetId];
            target.hp -= damage;
            console.log(`[SERVER] 💥 ${skillName} causou ${damage} de dano em ${target.name} (${target.hp}/${target.maxHp} HP)`);
            
            // Broadcast do dano
            const damageBC = {
              action: "pokemonDamaged",
              targetId,
              damage,
              currentHp: target.hp,
              maxHp: target.maxHp,
              skillName
            };
            
            for (const clientWs of wsClients.keys()) {
              try { 
                if (clientWs.readyState === WebSocket.OPEN) {
                  clientWs.send(JSON.stringify(damageBC)); 
                }
              } catch (e) {}
            }
            
            // Se morreu, remove do mapa
            if (target.hp <= 0) {
              console.log(`[SERVER] 💀 ${target.name} foi derrotado!`);
              delete gameState.wildPokemons[targetId];
              
              const deathBC = {
                action: "pokemonDeath",
                targetId
              };
              
              for (const clientWs of wsClients.keys()) {
                try { 
                  if (clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(JSON.stringify(deathBC)); 
                  }
                } catch (e) {}
              }
            }
          }
          break;

        case "updateSprite":
          {
            if (!gameState.players[playerId]) return;
            const player = gameState.players[playerId];
            const newSprite = payload?.sprite;
            if (newSprite) player.sprite = newSprite;
            // confirma para quem solicitou
            sendToClient(ws, { action: "updateSpriteOk", sprite: newSprite });
            // broadcast para demais clients
            const bc = { action: "playerBroadcastSprite", player: { id: playerId, sprite: newSprite, direction: player.direction } };
            for (const clientWs of wsClients.keys()) {
              try { if (clientWs.readyState === WebSocket.OPEN) clientWs.send(JSON.stringify(bc)); } catch (e) {}
            }
          }
          break;

        case "attackWildPokemon":
          {
            if (!gameState.players[playerId]) return;
            const player = gameState.players[playerId];
            const { targetId } = payload || {};
            
            const wild = gameState.wildPokemons[targetId];
            if (!wild) {
              sendToClient(ws, { error: "Pokemon não encontrado" });
              return;
            }
            
            // Verifica distância
            const distance = Math.abs(player.position.x - wild.position.x) + 
                           Math.abs(player.position.y - wild.position.y);
            
            if (distance > 1) {
              sendToClient(ws, { error: "Pokemon muito longe" });
              return;
            }
            
            // Calcula dano (15-25)
            const damage = Math.floor(Math.random() * 11) + 15;
            wild.hp = Math.max(0, wild.hp - damage);
            
            const died = wild.hp <= 0;
            console.log(`⚔️ ${player.name} atacou ${wild.name} causando ${damage} de dano! HP: ${wild.hp}${died ? ' (MORTO)' : ''}`);
            
            // Broadcast para todos os clientes
            const updates = [{
              type: 'attack',
              data: {
                attackerId: playerId,
                attackerType: 'player',
                targetId: wild.id,
                targetType: 'wildPokemon',
                damage,
                newHp: wild.hp,
                died
              }
            }];
            
            if (died) {
              // Se morreu, adiciona update de morte
              updates.push({
                type: 'death',
                data: {
                  pokemonId: wild.id,
                  position: wild.position
                }
              });
            }
            
            const broadcast = { action: "wildPokemonUpdates", updates };
            for (const clientWs of wsClients.keys()) {
              try { 
                if (clientWs.readyState === WebSocket.OPEN) {
                  clientWs.send(JSON.stringify(broadcast));
                }
              } catch (e) {}
            }
          }
          break;

        case "capturePokemon":
          {
            if (!gameState.players[playerId]) return;
            const player = gameState.players[playerId];
            const { pokemonId } = payload || {};
            
            const wild = gameState.wildPokemons[pokemonId];
            if (!wild) {
              sendToClient(ws, { error: "Pokemon não encontrado" });
              return;
            }
            
            // remove wild do mapa
            delete gameState.wildPokemons[pokemonId];
            
            // adiciona ao inventário do player
            player.pokemons = player.pokemons || [];
            player.pokemons.push({
              id: `p${player.pokemons.length + 1}`,
              name: wild.name,
              sprite: wild.sprite,
              sprite_down: wild.sprite,
              element: wild.element,
              hp: wild.hp,
              level: wild.level
            });
            
            console.log(`[CAPTURE] Player ${playerId} capturou ${wild.name}`);
            
            // confirma ao player
            sendToClient(ws, { 
              action: "captureSuccess", 
              data: { pokemonName: wild.name, totalCaught: player.pokemons.length }
            });
            
            // broadcast para todos
            const bc = {
              action: "captureBroadcast",
              playerId: playerId,
              playerName: player.name,
              pokemonName: wild.name
            };
            for (const clientWs of wsClients.keys()) {
              try { if (clientWs.readyState === WebSocket.OPEN) clientWs.send(JSON.stringify(bc)); } catch (e) {}
            }
          }
          break;

        case "chat":
          {
            if (!gameState.players[playerId]) return;
            const player = gameState.players[playerId];
            const { message, x, y, z } = payload || {};
            
            if (!message || message.length === 0 || message.length > 255) return;
            
            console.log(`[CHAT LOCAL] ${player.name}: ${message}`);
            
            // Envia para players próximos (range 20 tiles, mesmo andar)
            const range = 20;
            const broadcast = {
                action: "chatMessage",
                playerId: playerId,
                playerName: player.name,
                message: message,
                type: "local",
                position: { x, y, z }
            };
            
            for (const clientWs of wsClients.keys()) {
              try {
                const otherId = wsClients.get(clientWs);
                const other = gameState.players[otherId];
                if (other && other.position.z === z) {
                  const dist = Math.abs(other.position.x - x) + Math.abs(other.position.y - y);
                  if (dist <= range || otherId === playerId) {
                    if (clientWs.readyState === WebSocket.OPEN) {
                      clientWs.send(JSON.stringify(broadcast));
                    }
                  }
                }
              } catch (e) {}
            }
          }
          break;

        case "chatGlobal":
          {
            if (!gameState.players[playerId]) return;
            const player = gameState.players[playerId];
            const { message, x, y, z } = payload || {};
            
            if (!message || message.length === 0 || message.length > 255) return;
            
            console.log(`[CHAT GLOBAL] ${player.name}: ${message}`);
            
            // Envia para TODOS os players online
            const broadcast = {
                action: "chatMessage",
                playerId: playerId,
                playerName: player.name,
                message: message,
                type: "global",
                position: { x, y, z }
            };
            
            for (const clientWs of wsClients.keys()) {
              try {
                if (clientWs.readyState === WebSocket.OPEN) {
                    clientWs.send(JSON.stringify(broadcast));
                }
              } catch (e) {}
            }
          }
          break;

        // outros cases já existentes...
      }
    } catch (err) {
      console.error(err);
      sendToClient(ws, { error: "Erro no backend" });
    }
  });


  ws.on("close", () => {
      const playerId = wsClients.get(ws);
      if (playerId) removePlayerOnline(playerId);
      wsClients.delete(ws);
      console.log("Cliente desconectado");
  });
});

console.log("Servidor WebSocket pronto!");
