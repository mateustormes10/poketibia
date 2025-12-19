// ...new file...
import { SpritePlayerList } from "./SpritePlayerList.js";

/**
 * Retorna a primeira sequência válida (primeiro row) de frames para type/direction.
 * Ex.: getSpriteFrames("default","up") => [36192,36193,36194]
 */
export function getSpriteFrames(type = "default", direction = "down") {
	// pega a definição (fallback para default)
	const spriteType = SpritePlayerList[type] || SpritePlayerList.default;
	const dir = spriteType?.[direction] || spriteType?.down || [];
	// retorna a primeira linha que contenha números > 0
	for (const row of dir) {
		if (!Array.isArray(row)) continue;
		const nums = row.filter(v => Number.isFinite(v) && v > 0);
		if (nums.length) return nums;
	}
	return [];
}

/**
 * Retorna todas as linhas (rows) da direção como arrays de números (zeros mantidos).
 */
export function getSpriteRows(type = "default", direction = "down") {
	const spriteType = SpritePlayerList[type] || SpritePlayerList.default;
	const dir = spriteType?.[direction] || spriteType?.down || [];
	return dir.map(row => (Array.isArray(row) ? row.slice() : []));
}

// default export para facilitar imports que esperam default
export default getSpriteFrames;
