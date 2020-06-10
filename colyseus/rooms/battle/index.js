const Arena = require('../../../game/arena')
const colyseus = require('colyseus')
module.exports = class extends colyseus.Room {
    arena = new Arena()
    constructed = 0
    evaluateGroupInterval = 60000

    onCreate(options){
        this.onMessage('start-game-data', (client, payload)=>{
            this.arena.addPlayer(payload)
            this.constructed++
            if(this.constructed === 2){
                this.broadcast("game-started", this.arena.startGame())
                
                this.setSimulationInterval(async ()=>{
                    this.broadcast("start-new-turn", this.arena.startGame())
                }, this.evaluateGroupInterval)
            }
        })

        
    }
    onAuth(client, options, request){
        return true
    }
    onJoin(client, options){
        this.broadcast('joined', this.clients.length)
    }
    onLeave(client, consented){}
}