import http from "http";
import { Room, Client, Delayed } from "colyseus";
import {Arena, iPlayer, iCharacter} from "../engine"

interface iSkillCordinates {
    target?:number
    caster:number
    skill:number
}

interface iRegister {
    player:iPlayer,
    team:Array<iCharacter>
}

interface skillQueue {
    skills:Array<any>
}

export class Battle extends Room {
    private arena:Arena = new Arena()
    private constructed:number = 0
    private evaluateGroupInterval = 60000
    private delay:Delayed 
    // When room is initialized
    onCreate(options: any) { 
        this.onMessage('start-game-data', (client:Client, payload:iRegister) => {
            this.arena.addPlayer(payload.player, payload.team)

            this.constructed++
            if (this.constructed === 2) {
                this.broadcast("game-started", this.arena.startGame())

                this.delay = this.clock.setInterval(() => {
                    this.broadcast("start-new-turn", this.arena.startGame())
                }, this.evaluateGroupInterval)
            }
        })

        this.onMessage('end-game-turn', (client:Client, payload:any) => {
            this.delay.reset()
            this.arena.processTurn(payload)
            this.arena.executeSkills()
            this.broadcast("start-new-turn", this.arena.startGame())
        })

        this.onMessage('add-skill-to-queue', (client:Client, cordinates:iSkillCordinates) => {
            const payload = this.arena.addSkillToTempQueue(cordinates)
            client.send('update-temp-queue', payload)
        })

        this.onMessage('remove-skill-from-queue', (client:Client, cordinates:iSkillCordinates)=>{
            const payload = this.arena.removeSkillFromTempQueue(cordinates)
            client.send('update-temp-queue', payload)
        })
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client: Client, options: any, request: http.IncomingMessage) { 
        return true
    }

    // When client successfully join the room
    onJoin(client: Client, options: any, auth: any) { 
        this.broadcast('joined', this.clients.length)
    }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() { }
}