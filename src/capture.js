export class CaptureSystem {
	/**
	 * Calcula a chance de captura baseado em HP do pokemon
	 * @param {number} currentHp - HP atual do pokemon
	 * @param {number} maxHp - HP máximo do pokemon
	 * @param {string} ballType - tipo de pokébola ("normal", "great", "ultra")
	 * @returns {number} - chance de captura (0-1)
	 */
	static calculateCaptureChance(currentHp, maxHp, ballType = "normal") {
		// quanto menos HP, mais fácil capturar
		const hpRatio = Math.max(0, 1 - (currentHp / maxHp));
		
		// multiplicadores por tipo de pokébola
		const ballMultipliers = {
			"normal": 1.0,
			"great": 1.5,
			"ultra": 2.5
		};
		
		const multiplier = ballMultipliers[ballType] || 1.0;
		const baseChance = 0.3; // 30% base
		
		// chance final entre 5% e 95%
		return Math.max(0.05, Math.min(0.95, baseChance * (1 + hpRatio) * multiplier));
	}

	/**
	 * Tenta capturar um pokemon
	 * @param {Object} pokemon - objeto do pokemon
	 * @param {string} ballType - tipo de pokébola
	 * @returns {boolean} - sucesso na captura
	 */
	static attemptCapture(pokemon, ballType = "normal") {
		const chance = this.calculateCaptureChance(pokemon.hp, pokemon.maxHp || pokemon.hp, ballType);
		const roll = Math.random();
		
		console.log(`Captura: ${pokemon.name} | Chance: ${(chance*100).toFixed(1)}% | Roll: ${(roll*100).toFixed(1)}%`);
		
		return roll < chance;
	}
}
