import Entity from "./entity.js";
import { PokemonDatabase } from "./listPokemon.js";

export default class Pokemon extends Entity {
    constructor(name, x, y) {

        // Valida se o Pokémon existe no banco
        const data = PokemonDatabase[name];
        if (!data) {
            throw new Error("Pokemon '" + name + "' não existe em listPokemon.js");
        }

        super(x, y, 0); // sprite inicial será configurado abaixo

        this.name = name;

        // Atributos
        this.maxHP = data.maxHP;
        this.hp = data.maxHP;
        this.maxMana = data.maxMana;
        this.mana = data.maxMana;

        this.speed = data.speed ?? 1;
        this.aggressive = data.aggressive ?? false;

        // Magias limitadas a 12
        this.skills = data.skills.slice(0, 12);

        // Sprites
        this.spriteList = {
            up:    data.spriteList.up    ?? [],
            down:  data.spriteList.down  ?? [],
            left:  data.spriteList.left  ?? [],
            right: data.spriteList.right ?? []
        };

        this.direction = "down";
        this.currentAnimFrame = 0;
        this.animTimer = 0;

        // sprite inicial
        this.spriteId = this.spriteList.down[0] ?? 0;

        // inicializa cooldowns (em ms)
        this.skillCooldowns = {}; // { "Choque do Trovão": 0, ... }
        for (const s of (this.skills || [])) this.skillCooldowns[s] = 0;

        // para efeitos visuais/flags
        this.isFollower = this.isFollower ?? false;
    }
    // reduz timers (chame 1x por loop com delta ms)
    tickCooldowns(deltaMs) {
        for (const k of Object.keys(this.skillCooldowns)) {
            if (this.skillCooldowns[k] > 0) {
                this.skillCooldowns[k] = Math.max(0, this.skillCooldowns[k] - deltaMs);
            }
        }
    }
    // checa se skill disponível
    canUseSkill(skillName) {
        return (this.skillCooldowns[skillName] || 0) === 0 && (this.mana || 0) >= (SkillDatabase[skillName]?.manaCost || 0);
    }

    // setar cooldown (em ms)
    setSkillCooldown(skillName, ms) {
        this.skillCooldowns[skillName] = ms;
    }

    updateAI(map, deltaTime) {
        if (!this.aggressive) return;
        // Por enquanto apenas anda aleatoriamente
        this.wander(map, deltaTime);

        // Selvagem anda, seguidor não
        if (this.isFollower) return;
        this.x += (Math.random() - 0.5) * this.speed * deltaTime;
        this.y += (Math.random() - 0.5) * this.speed * deltaTime;
    }

    wander(map, deltaTime) {
        let nx = this.x;
        let ny = this.y;
        const r = Math.random();

        if (r < 0.25) {
            ny -= this.speed; this.direction = "up";
        } else if (r < 0.50) {
            ny += this.speed; this.direction = "down";
        } else if (r < 0.75) {
            nx -= this.speed; this.direction = "left";
        } else {
            nx += this.speed; this.direction = "right";
        }

        if (nx < 0 || ny < 0 || nx >= map.size || ny >= map.size) return;

        const tile = map.getTile(Math.floor(nx), Math.floor(ny));
        if (tile && tile.walkable === false) return;

        this.x = nx;
        this.y = ny;

        this.updateAnimation(deltaTime);
    }

    updateAnimation(deltaTime = 0.016) {
        this.animTimer += deltaTime;
        if (this.animTimer < 0.2) return;
        this.animTimer = 0;

        const list = this.spriteList[this.direction];
        if (!list || list.length === 0) return;

        this.currentAnimFrame = (this.currentAnimFrame + 1) % list.length;
        this.spriteId = list[this.currentAnimFrame];
    }
}
