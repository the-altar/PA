const colyseus = require('colyseus')
const matchMaker = require('colyseus').matchMaker
const ClientManager = require('../manager')

module.exports = class extends colyseus.Room {
    roomToCreate = "battle"
    maxWaitingTime = 6
    evaluateGroupInterval = 5000
    manager = new ClientManager()

    onCreate(options) {
        this.setSimulationInterval(async () => {
            try {
                const room = await matchMaker.createRoom('battle', {})
                const queue = this.manager.getRankedMap()
                for (let i = 1; i < queue.length; i = i + 2) {
                    for (let j = i - 1; j <= i; j++) {
                        const seat = await matchMaker.reserveSeatFor(room)
                        queue[j].connection.send('seat', seat)
                    }
                }
            } catch (err) {
                console.error(err)
            }

        }, this.evaluateGroupInterval)
    }
    onAuth(client, options, request) {
        return true
    }
    onJoin(client, options) {
        this.manager.addClient(client.sessionId, options, client)
    }
    onLeave(client, consented) {
        this.manager.removeClientById(client.sessionId)
    }
}