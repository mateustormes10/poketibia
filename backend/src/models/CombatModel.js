
export function calculateDamage(attacker, defender, skill) {
    const baseDamage = attacker.attack - defender.defense;
    return Math.max(1, baseDamage);
}

export function applyDamage(target, damage) {
    target.hp -= damage;
    if (target.hp < 0) target.hp = 0;
    return target;
}
export async function handleCombatAction({
    attackerId,
    defenderId,
    attackerType, // "player" | "pokemon"
    defenderType, // "player" | "pokemon"
    damage
}) {
    // Aqui você pode evoluir depois (defesa, crítico, elementos etc)

    if (defenderType === "pokemon") {
        await query(
            "UPDATE wild_pokemons SET hp = hp - ? WHERE id = ?",
            [damage, defenderId]
        );
    }

    if (defenderType === "player") {
        await query(
            "UPDATE players SET health = health - ? WHERE id = ?",
            [damage, defenderId]
        );
    }

    return {
        success: true,
        attackerId,
        defenderId,
        damage
    };
}