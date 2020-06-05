const colyseus = require('colyseus')
const clientManager = require('./clientManager')

module.exports = class extends colyseus.Room {
    numClientsToMatch = 2
    roomToCreate = "battle"
    maxWaitingTime = 6
    evaluateGroupInterval = 0
    manager = new clientManager()
     
    // when room is initialized
    onCreate(options) {
        this.onMessage("chat", (client, message) => {
            console.log(`message from client: ${message}`)
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
    async onLeave(client, consented) {
        this.manager.removeClientById(client.sessionId)
        this.broadcast("left", this.manager.getAllClients())
    }
    // Cleanup callback, called after there are no more clients in the room.
    onDispose() { }
}