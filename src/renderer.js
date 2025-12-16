import { Sprites } from "./spriteManager.js";

export default class Renderer {
    constructor(ctx, tileSize, viewWidth, viewHeight) {
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
    }

    draw(map, player, entities, follower,inventory, interaction,messageBox,  cameraX, cameraY) {
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
       
        this._drawPlayerComposed(player);

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

     

        this.drawInventory(inventory);
        this.drawInteractionMenu(interaction);
        this.drawMessageBox(messageBox);

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

    // desenha o player composto no centro da view (3 partes simultâneas)
    _drawPlayerComposed(player) {
        // centro da view em pixels (posição do tile onde o player está desenhado)
        const centerTileX = Math.floor(this.viewWidth / 2);
        const centerTileY = Math.floor(this.viewHeight / 2);
        const centerX = centerTileX * this.tileSize;
        const centerY = centerTileY * this.tileSize;

        // obtem os 3 ids: [center, left, top]
        const parts = player.getCurrentSpriteParts(); // pode retornar []
        if (!parts || parts.length === 0) {
            // fallback: desenha spriteId simples
            const spr = Sprites.get(player.spriteId);
            if (spr && spr.complete) this.ctx.drawImage(spr, centerX, centerY, this.tileSize, this.tileSize);
            return;
        }

        // Ordens: parts[1] = left, parts[2] = top, parts[0] = center
        // Desenha LEFT (x - tileSize)
        if (parts[1]) {
            const imgL = Sprites.get(parts[1]);
            if (imgL && imgL.complete) {
                this.ctx.drawImage(imgL, centerX - this.tileSize, centerY, this.tileSize, this.tileSize);
            }
        }

        // Desenha TOP (y - tileSize)
        if (parts[2]) {
            const imgT = Sprites.get(parts[2]);
            if (imgT && imgT.complete) {
                this.ctx.drawImage(imgT, centerX, centerY - this.tileSize, this.tileSize, this.tileSize);
            }
        }

        // DESENHAR NOME DO POKÉMON
        if (player.name) {
            this.ctx.fillStyle = "white";
            this.ctx.strokeStyle = "black";
            this.ctx.font = "14px Arial";
            this.ctx.lineWidth = 3;

            // Contorno preto do texto
            this.ctx.strokeText(player.name, centerX-20, centerY - 8);

            // Texto branco por cima
            this.ctx.fillText(player.name, centerX-20, centerY - 8);
        }

        // Desenha CENTER por último (sobreposto)
        if (parts[0]) {
            const imgC = Sprites.get(parts[0]);
            if (imgC && imgC.complete) {
                this.ctx.drawImage(imgC, centerX, centerY, this.tileSize, this.tileSize);
            }
        }
    }
}
