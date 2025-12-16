export const TileActions = {
  49: {
    look: () => "Uma alavanca antiga.",
    use: {
      allowed: true,
      animationSprites: [49, 50],
      onUse(game, x, y) {
        const tile = game.map.getTile(x, y);
        if (!tile) return;

        // troca sprite (estado puxado)
        tile.ground[tile.ground.length - 1] = 50;

        // feedback visual
        game.showMessage("Alavanca puxada!");
      }
    }
},

    50010: {
    look: () => "Um baú antigo.",
    use: {
      allowed: true,
      animationSprites: [70001, 70002],
      onUse(game, x, y) {
        const tile = game.map.getTile(x, y);
        if (!tile) return;

        // troca sprite para baú aberto
        tile.ground[tile.ground.length - 1] = 70002;

        // adiciona item
        game.inventory.addItem({
          sprite: 80001,
          name: "Potion"
        });

        game.showMessage("Você abriu o baú e encontrou uma Potion!");
      }
    }
},

     60020: {
        look: () => "Uma placa de madeira.",
        use: {
        allowed: true,
            onUse(game) {
                game.showMessage("Bem-vindo à cidade!");
            }
        }
    },
};
