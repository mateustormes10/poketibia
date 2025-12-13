export function sendError(ws, message) {
    ws.send(JSON.stringify({
        action: "error",
        message
    }));
}
