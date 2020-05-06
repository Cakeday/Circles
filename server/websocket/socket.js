var ws

module.exports = {
    init: (server) => {
        const WebSocket = require('ws')
        ws = new WebSocket.Server({server})
        return ws
    },
    getWS: () => {
        if (!ws) throw new Error('No connection established')
        return ws
    }
}