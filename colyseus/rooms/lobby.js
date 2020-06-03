const colyseus = require('colyseus')

module.exports = class extends colyseus.Room {
    // when room is initialized
    onCreate(options) {
        this.onMessage("type", (client, message) => {
            // handle "type" message.
        });
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, options, request) { 
        return true
    }
    // When client successfully joins the room
    onJoin(client, options) {
    }
    // When a client leaves the room
    onLeave(client, consented) {
    }
    // Cleanup callback, called after there are no more clients in the room.
    onDispose() { }
}