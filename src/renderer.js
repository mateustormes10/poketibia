import { Sprites } from "./spriteManager.js";

export default class Renderer {
    constructor(ctx, tileSize, viewWidth, viewHeight, game) {
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.game = game;
    }

    draw(map, player, entities, follower,inventory, interaction,messageBox,  cameraX, cameraY, otherPlayers) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let vy = 0; vy < this.viewHeight; vy++) {
            for (let vx = 0; vx < this.viewWidth; vx++) {

                // Calcula as posições no mapa para renderizar
                const mx = cameraX + vx;
                const my = cameraY + vy;

                const tile = map.getTile(mx, my);

                if (tile) {
                    const screenX = vx * this.tileSize;
                    const screenY = vy * this.tileSize;

                    //DESENHA TODAS AS SPRITES EMPILHADAS
                    for (let spriteId of tile.ground) {

                        const sprite = Sprites.get(spriteId);
                        
                        if (sprite && sprite.complete && sprite.naturalWidth > 0) {
                            this.ctx.drawImage(sprite, screenX, screenY, this.tileSize, this.tileSize);
                        }
                    }
                }
            }
        }

        // Render Pokémons Selvagens
        for (let mon of entities) {  
            
            let pokemonSprite = Sprites.get(mon.spriteId);       
            const sx = (mon.x - cameraX) * this.tileSize;
            const sy = (mon.y - cameraY) * this.tileSize;

            // DESENHAR NOME DO POKÉMON
            if (mon.name) {
                this.ctx.fillStyle = "white";
                this.ctx.strokeStyle = "black";
                this.ctx.font = "14px Arial";
                this.ctx.lineWidth = 3;

                // Contorno preto do texto
                this.ctx.strokeText(mon.name, sx-5, sy - 8);

                // Texto branco por cima
                this.ctx.fillText(mon.name, sx-5, sy - 8);
            }
            // DESENHAR BARRA DE VIDA
            if (typeof mon.hp === "number" && typeof mon.maxHP === "number") {
                const barWidth = this.tileSize;          // largura igual ao sprite
                const barHeight = 5;                     // altura da barra
                const lifePercent = Math.max(mon.hp / mon.maxHP, 0);

                const hpWidth = barWidth * lifePercent;

                // Fundo preto (vida perdida)
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(sx, sy - 4, barWidth, barHeight);

                // Vida vermelha
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(sx, sy - 4, hpWidth, barHeight);
            }

            this.ctx.drawImage(pokemonSprite, sx, sy, this.tileSize, this.tileSize);
        }

        // Render Pokémon seguidor (se existir)
        if (follower) {
            const followerSprite = Sprites.get(follower.spriteId);
            const fx = (follower.x - cameraX) * this.tileSize;
            const fy = (follower.y - cameraY) * this.tileSize;

            if (followerSprite && followerSprite.complete) {
                // DESENHAR NOME DO POKÉMON
                if (follower.name) {
                    this.ctx.fillStyle = "white";
                    this.ctx.strokeStyle = "black";
                    this.ctx.font = "14px Arial";
                    this.ctx.lineWidth = 3;

                    // Contorno preto do texto
                    this.ctx.strokeText(follower.name, fx-5, fy - 8);

                    // Texto branco por cima
                    this.ctx.fillText(follower.name, fx-5, fy - 8);
                }
                // DESENHAR BARRA DE VIDA
                if (typeof follower.hp === "number" && typeof follower.maxHP === "number") {
                    const barWidth = this.tileSize;          // largura igual ao sprite
                    const barHeight = 5;                     // altura da barra
                    const lifePercent = Math.max(follower.hp / follower.maxHP, 0);

                    const hpWidth = barWidth * lifePercent;

                    // Fundo preto (vida perdida)
                    this.ctx.fillStyle = "black";
                    this.ctx.fillRect(fx, fy - 4, barWidth, barHeight);

                    // Vida vermelha
                    this.ctx.fillStyle = "red";
                    this.ctx.fillRect(fx, fy - 4, hpWidth, barHeight);
                }
                this.ctx.drawImage(followerSprite, fx, fy, this.tileSize, this.tileSize);
            }
        }

        // ============================================
        // RENDERIZA EFEITOS DE SKILL (AOE, MAGIAS, ETC)
        // ============================================
        if (map.activeEffects && map.activeEffects.length > 0) {
            for (let fx of map.activeEffects) {

                // verifica se está dentro da câmera
                if (
                    fx.x < cameraX ||
                    fx.y < cameraY ||
                    fx.x >= cameraX + this.viewWidth ||
                    fx.y >= cameraY + this.viewHeight
                ) continue;

                const spriteId = fx.getSprite();
                const sprite = Sprites.get(spriteId);

                if (!sprite || !sprite.complete) continue;

                const FX_OFFSET_X = 0;
                const FX_OFFSET_Y = this.tileSize * 0.6; // ajuste fino aqui
                


                const sx = (fx.x - cameraX) * this.tileSize + FX_OFFSET_X;
                const sy = (fx.y - cameraY) * this.tileSize + FX_OFFSET_Y;

                if (sprite && sprite.complete && sprite.naturalWidth > 0) {
                    this.ctx.drawImage(sprite, sx, sy, this.tileSize, this.tileSize);
                }
            }
        }
       
        // Player local
        this._drawPlayerComposed(player, cameraX, cameraY);

        // =====================================
        // OVERLAY (árvores, casas, topo)
        // =====================================
        for (let vy = 0; vy < this.viewHeight; vy++) {
            for (let vx = 0; vx < this.viewWidth; vx++) {

                const mx = cameraX + vx;
                const my = cameraY + vy;
                const tile = map.getTile(mx, my);
                if (!tile || !tile.overlay) continue;


                const screenX = vx * this.tileSize;
                const screenY = vy * this.tileSize;

                

                for (let spriteId of tile.overlay) {
                    const sprite = Sprites.get(spriteId);
                    if (sprite?.complete) {
                        this.ctx.drawImage(sprite, screenX, screenY, this.tileSize, this.tileSize);
                    }
                }
            }
        }

        // Desenhar outros players
        if (otherPlayers) {
            for (const playerName in otherPlayers) {
                const p = otherPlayers[playerName];
                if (!p) continue;

                const screenX = (Math.floor(p.x) - cameraX) * this.tileSize;
                const screenY = (Math.floor(p.y) - cameraY) * this.tileSize;

                // sprite com fallback
let spriteId = p.spriteId;

// converte string numérica para número
if (!isNaN(spriteId)) spriteId = Number(spriteId);

// fallback
if (!spriteId) spriteId = "default";

const sprite = Sprites.get(spriteId);
if (sprite?.complete) this.ctx.drawImage(sprite, screenX, screenY, this.tileSize, this.tileSize);


console.log("Renderizando player", p.name, p.spriteId, sprite?.complete);

                if (sprite && sprite.complete) {
                    this.ctx.drawImage(sprite, screenX, screenY, this.tileSize, this.tileSize);
                }

                // desenhar nome
                if (p.name) {
                    this.ctx.fillStyle = "green";
                    this.ctx.strokeStyle = "black";
                    this.ctx.font = "14px Arial";
                    this.ctx.lineWidth = 3;
                    this.ctx.strokeText(p.name, screenX - 10, screenY - 8);
                    this.ctx.fillText(p.name, screenX - 10, screenY - 8);
                }

                // animação baseada no delta real (passar deltaMs do loop)
                if (typeof p.updateAnimation === "function") {
                    p.updateAnimation(deltaMs / 1000);
                }
            }
        }


        if (this.game.spriteMenuOpen) {
            this.drawSpritePreview(
                this.game.spriteSelector,
                this.ctx.canvas.width / 2 - 32,
                this.ctx.canvas.height / 2
            );
        }



     

        this.drawInventory(inventory);
        this.drawInteractionMenu(interaction);
        this.drawMessageBox(messageBox);

    }

    drawSpritePreview(spriteSelector, x, y) {
        const ctx = this.ctx;
        const size = this.tileSize;
        const padding = 12;

        const panelWidth = size * 3;
        const panelHeight = size * 4;

        const panelX = x - panelWidth / 2;
        const panelY = y - panelHeight / 2;

        // ===============================
        // FUNDO DO MENU (PRETO)
        // ===============================
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(panelX, panelY, panelWidth, panelHeight);

        ctx.strokeStyle = "#555";
        ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);

        // ===============================
        // BOTÃO FECHAR (X VERMELHO)
        // ===============================
        const closeSize = 20;
        const closeX = panelX + panelWidth - closeSize - 6;
        const closeY = panelY + 6;

        ctx.fillStyle = "#b00000";
        ctx.fillRect(closeX, closeY, closeSize, closeSize);

        ctx.strokeStyle = "black";
        ctx.strokeRect(closeX, closeY, closeSize, closeSize);

        ctx.fillStyle = "white";
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Esc", closeX + closeSize / 2, closeY + closeSize / 2);

        // ===============================
        // DESENHA SPRITE (PARTES)
        // ===============================
        const playerLike = {
    getCurrentSpriteParts: () => spriteSelector.getCurrentFrame()
};

const px = panelX + panelWidth / 2;
const py = panelY + panelHeight / 2;

this._drawComposedAt(playerLike, px, py);


        // ===============================
        // NOME DO SPRITE
        // ===============================
        ctx.fillStyle = "white";
        ctx.font = "14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(
            spriteSelector.getSpriteType(),
            panelX + panelWidth / 2,
            panelY + panelHeight - 22
        );
    }


    drawMessageBox(messageBox) {
        if (!messageBox || !messageBox.visible) return;

        const ctx = this.ctx;

        const boxWidth = 360;
        const boxHeight = 60;

        const x = (ctx.canvas.width - boxWidth) / 2;
        const y = (ctx.canvas.height - boxHeight) / 2;

        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(x, y, boxWidth, boxHeight);

        ctx.strokeStyle = "#aaa";
        ctx.strokeRect(x, y, boxWidth, boxHeight);

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(messageBox.text, x + boxWidth / 2, y + boxHeight / 2);
    }


    drawInteractionMenu(interaction) {
        if (!interaction || !interaction.open) return;

        const ctx = this.ctx;

        const boxWidth = 160;
        const optionHeight = 28;
        const padding = 8;
        const boxHeight =
            interaction.options.length * optionHeight + padding * 2;

        const x = (ctx.canvas.width - boxWidth) / 2;
        const y = ctx.canvas.height - boxHeight - 40;

        // fundo
        ctx.fillStyle = "rgba(0,0,0,0.85)";
        ctx.fillRect(x, y, boxWidth, boxHeight);

        ctx.strokeStyle = "#aaa";
        ctx.strokeRect(x, y, boxWidth, boxHeight);

        ctx.font = "14px Arial";
        ctx.textBaseline = "middle";

        for (let i = 0; i < interaction.options.length; i++) {
            const oy = y + padding + i * optionHeight;

            if (i === interaction.index) {
                ctx.fillStyle = "#444";
                ctx.fillRect(
                    x + 2,
                    oy,
                    boxWidth - 4,
                    optionHeight
                );
            }

            ctx.fillStyle = "white";
            ctx.fillText(
                interaction.options[i],
                x + 12,
                oy + optionHeight / 2
            );
        }
    }

    drawInventory(inventory) {
        if (!inventory.visible) return;

        const slotSize = 48;
        const startX = (this.ctx.canvas.width - inventory.cols * slotSize) / 2;
        const startY = (this.ctx.canvas.height - inventory.rows * slotSize) / 2;

        // fundo
        this.ctx.fillStyle = "rgba(0,0,0,0.8)";
        this.ctx.fillRect(
            startX - 12,
            startY - 12,
            inventory.cols * slotSize + 24,
            inventory.rows * slotSize + 24
        );

        // slots
        for (let i = 0; i < inventory.slots.length; i++) {
            const x = i % inventory.cols;
            const y = Math.floor(i / inventory.cols);

            const px = startX + x * slotSize;
            const py = startY + y * slotSize;

            this.ctx.strokeStyle = "#6b4a2b";
            this.ctx.strokeRect(px, py, slotSize, slotSize);

            const item = inventory.slots[i];
            if (item) {
                this.drawSprite(item.sprite, px + 8, py + 8);
            }
        }
    }

    _drawComposedAt(playerLike, px, py) {
        const parts = playerLike.getCurrentSpriteParts?.();
        if (!parts || parts.length === 0) return;

        // LEFT
        if (parts[1]) {
            const imgL = Sprites.get(parts[1]);
            if (imgL?.complete) {
                this.ctx.drawImage(
                    imgL,
                    px - this.tileSize,
                    py,
                    this.tileSize,
                    this.tileSize
                );
            }
        }

        // TOP
        if (parts[2]) {
            const imgT = Sprites.get(parts[2]);
            if (imgT?.complete) {
                this.ctx.drawImage(
                    imgT,
                    px,
                    py - this.tileSize,
                    this.tileSize,
                    this.tileSize
                );
            }
        }

        // CENTER (por último)
        if (parts[0]) {
            const imgC = Sprites.get(parts[0]);
            if (imgC?.complete) {
                this.ctx.drawImage(
                    imgC,
                    px,
                    py,
                    this.tileSize,
                    this.tileSize
                );
            }
        }
    }

    // desenha o player composto no centro da view (3 partes simultâneas)
    _drawPlayerComposed(p, cameraX, cameraY) {
    const screenX = (Math.floor(p.x) - cameraX) * this.tileSize;
    const screenY = (Math.floor(p.y) - cameraY) * this.tileSize;

    const sprite = Sprites.get(p.spriteId);
    if (sprite?.complete) {
        this.ctx.drawImage(sprite, screenX, screenY, this.tileSize, this.tileSize);
    }

    if (p.name) {
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "black";
        this.ctx.font = "14px Arial";
        this.ctx.lineWidth = 3;
        this.ctx.strokeText(p.name, screenX - 5, screenY - 8);
        this.ctx.fillText(p.name, screenX - 5, screenY - 8);
    }
}






}
