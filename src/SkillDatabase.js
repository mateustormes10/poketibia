import Skill from "./Skill.js";

export const SkillDatabase = {
    "Choque do Trovão": new Skill({
        name: "Choque do Trovão",
        type: "damage",
        element: "eletric",
        power: 35,
        manaCost: 10,
        spriteSkillList: ["thunder_1.png", "thunder_2.png", "thunder_3.png"],
        targetArea: "single"
    }),

    "Cauda de Ferro": new Skill({
        name: "Cauda de Ferro",
        type: "damage",
        element: "stone",
        power: 60,
        manaCost: 12,
        spriteSkillList: ["iron_tail_1.png", "iron_tail_2.png"],
        targetArea: "single"
    }),

    "Brasas": new Skill({
        name: "Brasas",
        type: "damage",
        element: "fire",
        power: 30,
        manaCost: 8,
        spriteSkillList: ["fire1.png", "fire2.png"],
        targetArea: "3x3"
    }),

    "Fogaréu": new Skill({
        name: "Fogaréu",
        type: "damage",
        element: "fire",
        power: 60,
        manaCost: 15,
        spriteSkillList: ["fire_big1.png", "fire_big2.png", "fire_big3.png"],
        targetArea: "5x5"
    }),

    "Arranhão": new Skill({
        name: "Arranhão",
        type: "damage",
        element: "normal",
        power: 20,
        manaCost: 5,
        spriteSkillList: ["scratch1.png", "scratch2.png"],
        targetArea: "single"
    })
};
