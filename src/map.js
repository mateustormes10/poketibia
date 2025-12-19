export function getTileAt(mapNearby, mapOrigin, x, y) {
	// mapOrigin: coord global do tile [0,0] do chunk
	if (!mapNearby || !mapNearby.length) return null;
	const localX = x - (mapOrigin?.x ?? 0);
	const localY = y - (mapOrigin?.y ?? 0);
	if (localY < 0 || localY >= mapNearby.length) return null;
	const row = mapNearby[localY];
	if (!row) return null;
	return row[localX] || null;
}

// Calcula a origem (mapOrigin) assumindo o player no centro do chunk
export function computeMapOrigin(mapNearby, playerX, playerY) {
	if (!mapNearby || !mapNearby.length) return { x: playerX, y: playerY };
	const centerX = Math.floor((mapNearby[0]?.length || 0) / 2);
	const centerY = Math.floor((mapNearby.length || 0) / 2);
	return {
		x: playerX - centerX,
		y: playerY - centerY
	};
}
