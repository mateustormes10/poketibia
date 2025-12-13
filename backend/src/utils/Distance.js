// Funções para cálculo de distâncias e proximidade
export function distance2D(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

export function distance3D(x1, y1, z1, x2, y2, z2) {
    return Math.sqrt(
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2) +
        Math.pow(z2 - z1, 2)
    );
}

export function isNearby(x1, y1, x2, y2, maxDistance) {
    return distance2D(x1, y1, x2, y2) <= maxDistance;
}
