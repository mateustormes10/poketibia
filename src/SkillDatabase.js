import Skill from "./Skill.js";

export const SkillDatabase = {
    "Choque do Trovão": new Skill({
        name: "Choque do Trovão",
        type: "damage",
        element: "eletric",
        power: 35,
        manaCost: 10,
        spriteSkillList: ["56827", "56827"],
        targetArea: "single"
    }),

    "Cauda de Ferro": new Skill({
        name: "Cauda de Ferro",
        type: "damage",
        element: "stone",
        power: 60,
        manaCost: 12,
        spriteSkillList: ["56827", "56818"],
        targetArea: "single"
    }),

    "Brasas": new Skill({
        name: "Brasas",
        type: "damage",
        element: "fire",
        power: 30,
        manaCost: 8,
        spriteSkillList: ["56827", "56827"],
        targetArea: "3x3"
    }),

    "Fogaréu": new Skill({
        name: "Fogaréu",
        type: "damage",
        element: "fire",
        power: 60,
        manaCost: 15,
        spriteSkillList: ["56827", "56827"],
        targetArea: "5x5"
    }),

    "Arranhão": new Skill({
        name: "Arranhão",
        type: "damage",
        element: "normal",
        power: 20,
        manaCost: 5,
        spriteSkillList: ["56827", "56827"],
        targetArea: "single"
    })
};
