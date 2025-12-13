// Logger simples para console
export function logInfo(message, ...args) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args);
}

export function logWarn(message, ...args) {
    console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args);
}

export function logError(message, ...args) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args);
}
