export class ChatSystem {
    constructor(game) {
        this.game = game;
        this.messages = []; // histórico local
        this.maxMessages = 100;
        this.chatTypes = {
            local: { color: "#FFFFFF", prefix: "" }, // branco
            global: { color: "#FFFF00", prefix: "[Global] " }, // amarelo
            system: { color: "#00FF00", prefix: "[Sistema] " }, // verde
            private: { color: "#FF69B4", prefix: "[Privado] " }, // rosa
            broadcast: { color: "#FFA500", prefix: "[Anúncio] " } // laranja
        };
    }

    // Adiciona mensagem ao histórico local
    addMessage(playerName, text, type = "local", playerId = null) {
        const timestamp = new Date().toLocaleTimeString("pt-BR");
        const typeConfig = this.chatTypes[type] || this.chatTypes.local;
        
        const message = {
            id: `msg_${Date.now()}_${Math.random()}`,
            playerName,
            text,
            type,
            playerId,
            timestamp,
            color: typeConfig.color,
            prefix: typeConfig.prefix,
            fullText: `${typeConfig.prefix}${playerName}: ${text}`
        };

        this.messages.push(message);

        // Mantém apenas as últimas N mensagens
        if (this.messages.length > this.maxMessages) {
            this.messages.shift();
        }

        return message;
    }

    // Envia mensagem ao servidor (será broadcast para nearby players)
    sendMessage(text, type = "local") {
        if (!text || text.length === 0 || !this.game.ws) return;
        if (this.game.ws.readyState !== WebSocket.OPEN) return;

        // Validação básica
        if (text.length > 255) text = text.substring(0, 255);
        text = text.trim();

        const action = type === "global" ? "chatGlobal" : "chat";

        this.game.ws.send(JSON.stringify({
            action: action,
            playerId: this.game.characterData.id,
            payload: {
                message: text,
                x: this.game.player?.position.x,
                y: this.game.player?.position.y,
                z: this.game.player?.position.z,
                type: type
            }
        }));
    }

    // Obtém últimas N mensagens
    getRecentMessages(count = 50) {
        return this.messages.slice(-count);
    }

    // Limpa histórico
    clearHistory() {
        this.messages = [];
    }

    // Filtra mensagens por tipo
    getMessagesByType(type) {
        return this.messages.filter(m => m.type === type);
    }

    // Filtra mensagens por jogador
    getMessagesByPlayer(playerName) {
        return this.messages.filter(m => m.playerName.toLowerCase() === playerName.toLowerCase());
    }
}

export class ChatUI {
    constructor(game, canvas) {
        this.game = game;
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        this.isOpen = false; // chat inicia invisível
        this.inputActive = false;
        this.inputText = "";
        this.inputMode = "local"; // "local" ou "global"

        // Dimensões da caixa de chat
        this.x = 10;
        this.y = 10;
        this.width = Math.min(400, canvas.width * 0.35);
        this.height = Math.min(200, canvas.height * 0.3);

        // Botão de toggle do chat (canto inferior esquerdo)
        this.buttonWidth = 100;
        this.buttonHeight = 30;
        this.buttonX = 10;
        this.buttonY = 0; // será ajustado no draw

        // Área de entrada
        this.inputHeight = 24;
        this.inputY = this.y + this.height;

        // Scroll
        this.scrollOffset = 0;
        this.messageHeight = 18;

        // Cores
        this.bgColor = "rgba(0, 0, 0, 0.7)";
        this.borderColor = "#888";
        this.textColor = "#FFF";
        this.inputBgColor = "rgba(30, 30, 30, 0.9)";
        this.inputBorderColor = "#FFF";
    }

    draw() {
        // Sempre desenha o botão de toggle
        this.drawToggleButton();

        if (!this.isOpen) return;

        // Fundo do chat
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);

        // Borda
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);

        // Mensagens
        this.drawMessages();

        // Input box
        this.drawInput();
    }

    drawToggleButton() {
        // Posição do botão no canto inferior esquerdo
        this.buttonY = this.canvas.height - this.buttonHeight - 10;
        
        // Fundo do botão
        this.ctx.fillStyle = this.isOpen ? "rgba(0, 255, 0, 0.3)" : "rgba(100, 100, 100, 0.7)";
        this.ctx.fillRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

        // Borda do botão
        this.ctx.strokeStyle = this.isOpen ? "#00FF00" : "#FFF";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);

        // Texto do botão
        this.ctx.fillStyle = "#FFF";
        this.ctx.font = "14px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText("CHAT", this.buttonX + this.buttonWidth / 2, this.buttonY + this.buttonHeight / 2);
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
    }

    drawMessages() {
        const messages = this.game.chatSystem.getRecentMessages(10);
        const lineHeight = this.messageHeight;
        const maxLines = Math.floor(this.height / lineHeight);

        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
        this.ctx.clip();

        this.ctx.font = "12px Arial";
        this.ctx.textBaseline = "top";

        let y = this.y + 5;

        // Se há muitas mensagens, começa de trás
        const startIdx = Math.max(0, messages.length - maxLines);
        for (let i = startIdx; i < messages.length; i++) {
            const msg = messages[i];
            
            // Timestamp
            this.ctx.fillStyle = "#666";
            this.ctx.fillText(`[${msg.timestamp}]`, this.x + 5, y);

            // Nome + mensagem
            this.ctx.fillStyle = msg.color;
            const fullMsg = `${msg.prefix}${msg.playerName}: ${msg.text}`;
            
            // Quebra de linha se necessário
            const wrappedText = this.wrapText(fullMsg, this.width - 20);
            for (const line of wrappedText) {
                this.ctx.fillText(line, this.x + 5, y);
                y += lineHeight;
            }
        }

        this.ctx.restore();
    }

    drawInput() {
        // Fundo do input
        this.ctx.fillStyle = this.inputBgColor;
        this.ctx.fillRect(this.x, this.inputY, this.width, this.inputHeight);

        // Borda
        this.ctx.strokeStyle = this.inputActive ? "#00FF00" : this.inputBorderColor;
        this.ctx.lineWidth = this.inputActive ? 2 : 1;
        this.ctx.strokeRect(this.x, this.inputY, this.width, this.inputHeight);

        // Modo indicator
        const modeText = this.inputMode === "global" ? "[GLOBAL]" : "[Local]";
        this.ctx.fillStyle = this.inputMode === "global" ? "#FFFF00" : "#FFF";
        this.ctx.font = "11px Arial";
        this.ctx.fillText(modeText, this.x + 5, this.inputY + 6);

        // Input text
        this.ctx.fillStyle = this.textColor;
        this.ctx.font = "12px Arial";
        const displayText = this.inputText.length > 0 ? this.inputText : "(Digite aqui)";
        this.ctx.fillText(displayText, this.x + 65, this.inputY + 6);
    }

    wrapText(text, maxWidth) {
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";

        this.ctx.font = "12px Arial";

        for (const word of words) {
            const testLine = currentLine + (currentLine ? " " : "") + word;
            const metrics = this.ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine) {
                lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }

        if (currentLine) lines.push(currentLine);
        return lines;
    }

    handleInput(key) {
        if (!this.inputActive) return;

        if (key === "Enter") {
            if (this.inputText.length > 0) {
                // Apenas envia ao servidor, não adiciona localmente
                // O servidor fará o broadcast de volta incluindo para o próprio jogador
                this.game.chatSystem.sendMessage(this.inputText, this.inputMode);
                this.inputText = "";
            }
        } else if (key === "Backspace") {
            this.inputText = this.inputText.slice(0, -1);
        } else if (key.length === 1 && this.inputText.length < 255) {
            this.inputText += key;
        } else if (key.toLowerCase() === "g" && this.inputText.length === 0) {
            // Press G para alternar entre local/global
            this.inputMode = this.inputMode === "local" ? "global" : "local";
        }
    }

    toggleInput() {
        this.inputActive = !this.inputActive;
        if (!this.inputActive) this.inputText = "";
    }

    toggleVisibility() {
        this.isOpen = !this.isOpen;
        // Se fechar o chat, desativa o input também
        if (!this.isOpen) {
            this.inputActive = false;
            this.inputText = "";
        }
    }

    handleButtonClick(x, y) {
        // Verifica se o clique foi no botão de toggle
        if (x >= this.buttonX && x <= this.buttonX + this.buttonWidth &&
            y >= this.buttonY && y <= this.buttonY + this.buttonHeight) {
            this.toggleVisibility();
            return true;
        }
        return false;
    }
}
