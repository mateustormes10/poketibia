import { ElementChart } from "./ElementChart.js";

export default class Skill {
    constructor({
        name,
        type,                       // "damage", "heal", "support"
        element,                    // "fire", "water", "eletric", ...
        power,                      // força base da skill
        manaCost,
        spriteSkillList,            // exemplo: ["fx1.png", "fx2.png", "fx3.png"]
        targetArea = "single",      // "single", "3x3", "5x5"
    }) {
        this.name = name;
        this.type = type;
        this.element = element;
        this.power = power;
        this.manaCost = manaCost;
        this.spriteSkillList = spriteSkillList;
        this.targetArea = targetArea;

        this.animSpeed = 150; // ms por frame
    }

    // ========================================================================
    // CÁLCULO DE MULTIPLICADORES
    // ========================================================================
    static getElementMultiplier(skillElement, defenderElements = []) {
        let multiplier = 1.0;

        if (!Array.isArray(defenderElements)) return multiplier;

        for (const def of defenderElements) {
            const chart = ElementChart[def];
            if (!chart) continue;

            if (chart.weakTo?.includes(skillElement)) {
                multiplier *= 2;
            }

            if (chart.strongAgainst?.includes(skillElement)) {
                multiplier *= 0.5;
            }
        }

        return multiplier;
    }


    // ========================================================================
    // CÁLCULO DO DANO
    // ========================================================================
    static calculateDamage(attacker, defender, skill) {

        const atk = Number(attacker.attackBase ?? 1);
        const def = Number(defender.deffenseBase ?? 0);
        const base = Number(skill.baseDamage ?? 1);

        const elements = Array.isArray(defender.elements)
            ? defender.elements
            : ["normal"];

        const mult = this.getElementMultiplier(
            skill.element ?? "normal",
            elements
        );

        // cálculo seguro
        let damage = (atk + base) * mult - def;

        if (!Number.isFinite(damage) || damage < 1) {
            damage = 1;
        }

        return Math.floor(damage);
    }


    // ========================================================================
    // EXECUÇÃO DA SKILL GENÉRICA
    // ========================================================================
    execute(attacker, targets) {
    const results = [];

    for (const target of targets) {

        if (this.type === "damage") {
            const dmg = Skill.calculateDamage(attacker, target, this);

            target.hp = Number(target.hp ?? target.maxHP ?? 0);
            target.maxHP = Number(target.maxHP ?? target.hp ?? 1);

            target.hp -= dmg;
            if (target.hp < 0) target.hp = 0;

            results.push({
                target,
                damage: dmg,
                type: "damage"
            });
        }

        else if (this.type === "heal") {
            const heal = Number(this.power ?? 1);

            target.hp = Number(target.hp ?? target.maxHP ?? 0);
            target.maxHP = Number(target.maxHP ?? target.hp ?? 1);

            target.hp = Math.min(target.maxHP, target.hp + heal);

            results.push({
                target,
                heal,
                type: "heal"
            });
        }
    }

    return results;
}


    // ========================================================================
    // SISTEMA DE ÁREAS (RETORNA COORDENADAS)
    // ========================================================================
    getAffectedTiles(centerX, centerY) {
        if (this.targetArea === "single") {
            return [{ x: centerX, y: centerY }];
        }

        if (this.targetArea === "3x3") {
            let tiles = [];
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    tiles.push({ x: centerX + dx, y: centerY + dy });
                }
            }
            return tiles;
        }

        if (this.targetArea === "5x5") {
            let tiles = [];
            for (let dx = -2; dx <= 2; dx++) {
                for (let dy = -2; dy <= 2; dy++) {
                    tiles.push({ x: centerX + dx, y: centerY + dy });
                }
            }
            return tiles;
        }

        return [];
    }
}
