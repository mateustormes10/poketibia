import Game from "./game.js";

const canvas = document.getElementById("gameCanvas");
// Ajusta canvas à tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const game = new Game(canvas);

game.start();
