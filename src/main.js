import Game from "./game.js";

const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let authToken = null;
let accountData = null;
let selectedCharacter = null;

const ctx = canvas.getContext("2d");

// Inicializa game só quando personagem for selecionado
let game = null;

// === Funções de Backend ===
async function register(username, password, email) {
    const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email })
    });
    return await res.json();
}

async function login(username, password) {
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    return await res.json();
}

async function getPlayer(token) {
    const res = await fetch("http://localhost:3000/player/me", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });
    return await res.json();
}

// === Interface dentro do canvas ===
let menuState = "login"; // login, register, characterSelect

let inputFields = [];
let currentInput = 0;

function createInputField(x, y, placeholder, type = "text") {
    inputFields.push({ x, y, value: "", placeholder, type });
}
const background = new Image();
background.src = "./assets/wallpaper.png";

let backgroundLoaded = false;
background.onload = () => {
    backgroundLoaded = true;
    draw();
};
function drawBackground() {
    if (backgroundLoaded) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = "#222"; // fallback
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function drawOverlay() {
    ctx.fillStyle = "rgba(50, 50, 50, 0.5)"; // cinza escuro semi-transparente
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// === Inicializa campos de login ===
function initLoginFields() {
    inputFields = [];
    createInputField(canvas.width/2 - 100, canvas.height/2 - 50, "Username");
    createInputField(canvas.width/2 - 100, canvas.height/2, "Password", "password");
}

function drawLogin() {
    drawBackground();
drawOverlay();    // depois aplica overlay semi-transparente

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Login", canvas.width/2 - 30, canvas.height/2 - 100);

    inputFields.forEach((field, i) => {
        ctx.strokeStyle = i === currentInput ? "yellow" : "white";
        ctx.strokeRect(field.x, field.y, 200, 30);
        ctx.fillStyle = "white";
        ctx.fillText(field.value || field.placeholder, field.x + 5, field.y + 22);
    });

    ctx.fillText("Press Enter to submit", canvas.width/2 - 80, canvas.height/2 + 100);
}

function drawCharacterSelect(playerData) {
    drawBackground();
drawOverlay();    // depois aplica overlay semi-transparente

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Select Character", canvas.width/2 - 80, 50);

    const chars = accountData.characters || [];

    if (chars.length > 0) {
        chars.forEach((c, i) => {
            ctx.fillStyle = selectedCharacter === i ? "yellow" : "white";
            ctx.fillText(c.name, canvas.width/2 - 50, 150 + i * 40);
        });
    } else {
        if(!creatingCharacter){
            ctx.fillText("No characters found. Press Enter to create!", canvas.width/2 - 150, canvas.height/2);
        }
    }

    ctx.fillText("Press Enter to play / C to create new", canvas.width/2 - 120, canvas.height - 50);

}


// === Lógica de input ===
window.addEventListener("keydown", async (e) => {
        // Tecla ESC ou ArrowLeft para voltar
if(e.key === "Escape" || e.key === "ArrowLeft") {
    switch(menuState) {
        case "characterSelect":
            if(creatingCharacter) {
                // Se estiver criando character, volta pra character select
                creatingCharacter = false;
            } else {
                // Se estiver na lista de characters, volta para menu de login/account
                menuState = "login"; // ou outro menu inicial
                initLoginFields();   // opcional, reinicia campos
            }
            break;
        case "register":
            // Volta para login
            menuState = "login";
            initLoginFields();
            break;
        case "login":
            // Pode não fazer nada ou exibir mensagem "Não é possível voltar"
            break;
    }
    draw(); // redesenha tela atualizada
    return; // evita processar outras teclas
}

    // === LOGIN / REGISTER ===
    if(menuState === "login" || menuState === "register") {
        const field = inputFields[currentInput];

        switch(e.key) {
            case "Tab":
                currentInput = (currentInput + 1) % inputFields.length;
                e.preventDefault();
                break;
            case "Backspace":
                field.value = field.value.slice(0, -1);
                break;
            case "Enter":
                if(menuState === "login") {
                    const username = inputFields[0].value;
                    const password = inputFields[1].value;
                    const res = await login(username, password);
                    if(res.token) {
                        authToken = res.token;
                        accountData = res.account;
                        // Como getPlayer retorna um array de personagens, usamos diretamente
                        const playerData = await getPlayer(authToken);

                        accountData.characters = Array.isArray(playerData) ? playerData : [];
                        selectedCharacter = 0;
                        menuState = "characterSelect";
                        draw();
                        return; // evita que o mesmo Enter continue
                    } else alert("Login failed");
                } else if(menuState === "register") {
                    const username = inputFields[0].value;
                    const password = inputFields[1].value;
                    const email = inputFields[2].value;
                    const res = await register(username, password, email);
                    if(res.success) {
                        alert("Account created! Please login.");
                        menuState = "login";
                        initLoginFields();
                    } else alert("Registration failed");
                }
                break;
            default:
                if(e.key.length === 1) field.value += e.key;
                break;
        }

        // Alterna login/register
        if(e.key.toLowerCase() === "r") {
            if(menuState === "login") initRegisterFields(), menuState="register";
            else if(menuState === "register") initLoginFields(), menuState="login";
        }

        draw();
        return; // termina aqui para não processar nada de characterSelect
    }

    // === CHARACTER SELECTION / CREATE ===
    if(menuState === "characterSelect") {

        // Criar personagem
        if(creatingCharacter) {
            if(e.key === "Backspace") {
                newCharacterName = newCharacterName.slice(0,-1);
            } else if(e.key === "Enter") {
                if(newCharacterName.length === 0) return;
                const res = await fetch("http://localhost:3000/player/create", {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${authToken}`
                    },
                    body: JSON.stringify({ name: newCharacterName })
                });
                const data = await res.json();

                // Atualiza lista de personagens do backend
                const characters = await getPlayer(authToken);
                accountData.characters = Array.isArray(characters) ? characters : [];
                selectedCharacter = accountData.characters.length - 1;
                creatingCharacter = false;
                newCharacterName = "";
                draw();


            } else if(e.key.length === 1 && newCharacterName.length < 12) {
                newCharacterName += e.key;
            }
            draw();
            return; // termina aqui
        }

        // Navegação entre personagens
        const chars = accountData.characters || [];
        switch(e.key) {
            case "ArrowDown":
                if(chars.length > 0) selectedCharacter = (selectedCharacter + 1) % chars.length;
                break;
            case "ArrowUp":
                if(chars.length > 0) selectedCharacter = (selectedCharacter - 1 + chars.length) % chars.length;
                break;
            case "Enter":
                if(chars.length === 0) {
                    creatingCharacter = true;
                    newCharacterName = "";
                } else {
                    game = new Game(canvas, authToken, selectedCharacter);
                    game.start();
                }
                break;
            case "c":
            case "C":
                creatingCharacter = true;
                newCharacterName = "";
                break;
            default:
                break;
        }

        draw();
    }
});



function draw() {
    if (menuState === "login") drawLogin();
    else if (menuState === "register") drawRegister();
    else if (menuState === "characterSelect") {
        if(creatingCharacter) drawCharacterCreate();
        else drawCharacterSelect(accountData);
    }
}

function initRegisterFields() {
    inputFields = [];
    createInputField(canvas.width/2 - 100, canvas.height/2 - 80, "Username");
    createInputField(canvas.width/2 - 100, canvas.height/2 - 40, "Password", "password");
    createInputField(canvas.width/2 - 100, canvas.height/2, "Email");
}

function drawRegister() {
    drawBackground();
drawOverlay();    // depois aplica overlay semi-transparente

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Register", canvas.width/2 - 40, canvas.height/2 - 120);

    inputFields.forEach((field, i) => {
        ctx.strokeStyle = i === currentInput ? "yellow" : "white";
        ctx.strokeRect(field.x, field.y, 200, 30);
        ctx.fillStyle = "white";
        ctx.fillText(field.value || field.placeholder, field.x + 5, field.y + 22);
    });

    ctx.fillText("Press Enter to submit", canvas.width/2 - 80, canvas.height/2 + 60);
}
let creatingCharacter = false;
let newCharacterName = "";

function drawCharacterCreate() {
    drawBackground();
drawOverlay();    // depois aplica overlay semi-transparente

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Create New Character", canvas.width/2 - 120, canvas.height/2 - 100);

    ctx.strokeStyle = "white";
    ctx.strokeRect(canvas.width/2 - 100, canvas.height/2 - 50, 200, 30);
    ctx.fillText(newCharacterName || "Character Name", canvas.width/2 - 95, canvas.height/2 - 27);

    ctx.fillText("Press Enter to create", canvas.width/2 - 80, canvas.height/2 + 50);
}


// Inicializa campos de login
initLoginFields();
draw();

// Redimensionamento
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
});
