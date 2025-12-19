export const TileActions = {

  49: {
    layer: "ground", // alavanca fica NA FRENTE do player
    look: () => "Uma alavanca antiga.",
    use: {
      allowed: true,
      animationSprites: [49, 50],
      onUse(game, x, y) {
        const tile = game.map.getTile(x, y);
        if (!tile) return;

        tile.overlay[tile.overlay.length - 1] = 50;
        game.showMessage("Alavanca puxada!");
      }
    }
  },
  10358: {
    layer: "ground",
    look: () => "Escadas para cima",
    floorUp: 4,
  },

  455: {
    layer: "ground",
    look: () => "Escadas para baixo",
    floorDown: 3,
  },

  197: {
    layer: "overlay",
    look: () => "Um portal brilhante para a cidade.",
    teleportTo: [73, 34, 3],  // teletransporta para x=73, y=34, z=3
    idleAnimation: {
      frames: [197, 198, 199, 197],
      interval: 160,
      range: 20
    }
  },

  // Portal para outro local diferente
  // Use este tile ID na sua matriz quando quiser outro destino
  200: {
    layer: "overlay",
    look: () => "Um portal mágico para a masmorra.",
    teleportTo: [100, 100, 1],  // teletransporta para x=100, y=100, z=1
    idleAnimation: {
      frames: [200, 200],
      interval: 160,
      range: 20
    }
  },

  201: {
    layer: "overlay",
    look: () => "Um portal para a arena.",
    teleportTo: [50, 50, 2],  // teletransporta para x=50, y=50, z=2
    idleAnimation: {
      frames: [201, 201],
      interval: 160,
      range: 20
    }
  },

  198: {
    layer: "overlay",
    look: () => "Escadas para cima",
    floorUp: 4,
    idleAnimation: {
      frames: [198, 198],
      interval: 200,
      range: 15
    }
  },
  199: {
    layer: "overlay",
    look: () => "Escadas para baixo",
    floorDown: 3,
    idleAnimation: {
      frames: [199, 199],
      interval: 200,
      range: 15
    }
  },
  50010: {
    layer: "overlay", // baú fica na frente
    look: () => "Um baú antigo.",
    use: {
      allowed: true,
      animationSprites: [70001, 70002],
      onUse(game, x, y) {
        const tile = game.map.getTile(x, y);
        if (!tile) return;

        tile.overlay[tile.overlay.length - 1] = 70002;

        game.inventory.addItem({
          sprite: 80001,
          name: "Potion"
        });

        game.showMessage("Você abriu o baú e encontrou uma Potion!");
      }
    }
  },
  379: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma placa de madeira.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Bem-vindo à cidade!");
      }
    }
  }, 
  380: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma placa de madeira.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Bem-vindo à cidade!");
      }
    }
  }, 
  381: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma placa de madeira.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Bem-vindo à cidade!");
      }
    }
  }, 
  382: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma placa de madeira.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Bem-vindo à cidade!");
      }
    }
  }, 
  383: {
    layer: "overlay",
    look: (tile) => tile.data?.[383] || "Uma placa de madeira.",
    use: {
      allowed: true,
      onUse(game, x, y) {
        const tile = game.map.getTile(x, y);
        const text = tile?.data?.[383];
        if (text) game.showMessage(text);
      }
    }
  },
  384: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma placa de madeira.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Bem-vindo à cidade!");
      }
    }
  }, 
  452: {
    layer: "overlay",
  },
  453: {
    layer: "overlay",
  },
  454: {
    layer: "overlay",
  },
  481: {
    layer: "overlay",
  },
  482: {
    layer: "overlay",
  },
  483: {
    layer: "overlay",
  },
  484: {
    layer: "overlay",
  },
  485: {
    layer: "overlay",
  },
  1199: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma pedra media.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Uma pedra media!");
      }
    }
  }, 
  1200: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma pedra pequena.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Uma pedra pequena!");
      }
    }
  }, 
  1165: {
    layer: "overlay",
  }, 
  1166: {
    layer: "overlay", 
  }, 
  1167: {
    layer: "overlay",
  },
  1168: {
    layer: "overlay", // placa sempre sobre o player
    look: () => "Uma arvore.",
    use: {
      allowed: true,
      onUse(game) {
        game.showMessage("Uma arvore pequena!");
      }
    }
  }, 
};
