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

        this.animFrame = 0;
        this.animTimer = 0;
        this.animSpeed = 150; // ms por frame
    }

    // ========================================================================
    // SISTEMA DE ANIMAÇÃO DA SKILL FX
    // ========================================================================
    updateAnimation(dt) {
        this.animTimer += dt;
        if (this.animTimer >= this.animSpeed) {
            this.animTimer = 0;
            this.animFrame++;
            if (this.animFrame >= this.spriteSkillList.length) {
                this.animFrame = 0;
            }
        }
    }

    getCurrentSprite() {
        return this.spriteSkillList[this.animFrame];
    }

    // ========================================================================
    // CÁLCULO DE MULTIPLICADORES
    // ========================================================================
    static getElementMultiplier(skillElement, defenderElements) {
        let multiplier = 1.0;

        for (let def of defenderElements) {
            // fraqueza → 2x
            if (ElementChart[def]?.weakTo?.includes(skillElement)) {
                multiplier *= 2;
            }
            // resistência → 0.5x
            if (ElementChart[def]?.strongAgainst?.includes(skillElement)) {
                multiplier *= 0.5;
            }
        }

        return multiplier;
    }

    // ========================================================================
    // CÁLCULO DO DANO
    // ========================================================================
    calculateDamage(attacker, defender) {
        const atk = attacker.attackBase;
        const def = defender.deffenseBase;

        const base = this.power * atk;

        const elementMultiplier = Skill.getElementMultiplier(this.element, defender.elements);

        const finalDamage = Math.floor((base - def) * elementMultiplier);

        return Math.max(finalDamage, 1);
    }

    // ========================================================================
    // EXECUÇÃO DA SKILL GENÉRICA
    // ========================================================================
    execute(attacker, targets) {
        let results = [];

        for (let target of targets) {

            if (this.type === "damage") {
                const dmg = this.calculateDamage(attacker, target);
                target.hp -= dmg;

                if (target.hp < 0) target.hp = 0;

                results.push({
                    target,
                    damage: dmg,
                    type: "damage"
                });
            }

            else if (this.type === "heal") {
                const healAmount = this.power;
                target.hp += healAmount;
                if (target.hp > target.maxHP) target.hp = target.maxHP;

                results.push({
                    target,
                    heal: healAmount,
                    type: "heal"
                });
            }

            else if (this.type === "support") {
                // exemplo genérico: buff de ataque
                target.attackBase += this.power;

                results.push({
                    target,
                    buff: "attackUp",
                    type: "support"
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
