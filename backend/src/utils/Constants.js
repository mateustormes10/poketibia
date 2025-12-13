// Constantes do servidor e do jogo
export const GAME = {
    MAP_SIZE: 500,
    TILE_SIZE: 32,
    FOLLOWER_DISTANCE: 2,
    PLAYER_VIEW_DISTANCE: 10,
};

export const SERVER = {
    DEFAULT_PORT: 3000,
    JWT_SECRET: process.env.JWT_SECRET || "secret123",
};

export const POKEMON = {
    MAX_SKILLS: 12,
};
