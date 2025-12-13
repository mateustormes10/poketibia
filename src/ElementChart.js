// ============================================================================
// SISTEMA DE TIPOS E MULTIPLICADORES
// ============================================================================
export const ElementChart = {
    fire: {
        weakTo: ["water", "ground"],
        strongAgainst: ["grass", "ice"]
    },
    water: {
        weakTo: ["eletric", "grass"],
        strongAgainst: ["fire", "rock"]
    },
    grass: {
        weakTo: ["fire", "ice"],
        strongAgainst: ["water", "ground"]
    },
    eletric: {
        weakTo: ["ground"],
        strongAgainst: ["water"]
    },
    stone: {
        weakTo: ["water", "grass"],
        strongAgainst: ["eletric", "fire"]
    },
    ground: {
        weakTo: ["water", "grass"],
        strongAgainst: ["eletric", "fire"]
    }
};
