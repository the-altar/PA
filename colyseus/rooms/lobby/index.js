const colyseus = require('colyseus')
const clientManager = require('../manager')

module.exports = class extends colyseus.Room {

    manager = new clientManager()
     
    // when room is initialized
    onCreate(options) {
        this.onMessage("message", (client, message) => {
            const c = this.manager.getClientById(client.sessionId)     
            this.broadcast("message", {content: message, sender: c})
        });
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, options, request) { 
        return true
    }
    // When client successfully joins the room
    onJoin(client, options) {
        this.manager.addClient(client.sessionId, options)
        this.broadcast("joined", this.manager.getAllClients())
    }
    // When a client leaves the room
    onLeave(client, consented) {
        this.manager.removeClientById(client.sessionId)
        this.broadcast("left", this.manager.getAllClients())
    }
    // Cleanup callback, called after there are no more clients in the room.
    onDispose() { }
}