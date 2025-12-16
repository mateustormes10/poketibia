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
197: {
  layer: "overlay",
  look: () => "Um portal brilhante.",
  teleportTo: [73, 34, 3],

  idleAnimation: {
    frames: [197, 198, 199, 197],
    interval: 600,
    range: 8 // ativa se player estiver até 3 tiles
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
