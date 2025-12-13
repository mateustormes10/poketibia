// Validação de dados simples
export function isNumber(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

export function isString(value) {
    return typeof value === "string" && value.trim().length > 0;
}

export function isPositiveNumber(value) {
    return isNumber(value) && value > 0;
}

export function validateCoordinates(x, y) {
    return isNumber(x) && isNumber(y) && x >= 0 && y >= 0;
}
