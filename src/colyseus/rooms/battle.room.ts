import http from "http";
import { Room, Client, Delayed } from "colyseus";
import { Arena, iPlayer, iCharacter } from "../../engine"

interface iSkillCordinates {
    target?: number
    caster: number
    skill: number
}

interface iRegister {
    player: iPlayer,
    team: Array<iCharacter>
}

export class Battle extends Room {
    private arena: Arena = new Arena()
    private constructed: number = 0
    private evaluateGroupInterval = 60000
    private delay: Delayed
    // When room is initialized
    onCreate(options: any) {
        this.onMessage('start-game-data', (client: Client, payload: iRegister) => {
            this.arena.addPlayer(payload.player, payload.team)

            this.constructed++
            if (this.constructed === 2) {
                const { gameData } = this.arena.startGame()

                this.broadcast("game-started", gameData)

                this.delay = this.clock.setInterval(() => {
                    const { isOver, gameData, winner, loser } = this.arena.startGame()

                    if (!isOver) this.broadcast("start-new-turn", gameData)
                    else {
                        this.broadcast("end-game", { winner, loser })
                        this.disconnect()
                    }

                }, this.evaluateGroupInterval)
            }
        })

        this.onMessage('end-game-turn', (client: Client, payload: any) => {
            this.delay.reset()
            this.arena.processTurn(payload)

            const { isOver, gameData, winner, loser } = this.arena.startGame(true)

            if (!isOver) this.broadcast("start-new-turn", gameData)
            else {
                this.broadcast("end-game", { winner, loser })
                this.disconnect()
            }
        })

        this.onMessage('add-skill-to-queue', (client: Client, cordinates: iSkillCordinates) => {
            const payload = this.arena.addSkillToTempQueue(cordinates)
            client.send('update-temp-queue', payload)
        })

        this.onMessage('remove-skill-from-queue', (client: Client, cordinates: iSkillCordinates) => {
            const payload = this.arena.removeSkillFromTempQueue(cordinates)
            client.send('update-temp-queue', payload)
        })

        this.onMessage('surrender', (client: Client, id:string) => {
            const { winner, loser } = this.arena.surrender(id)
            this.broadcast("end-game", { winner, loser })
            this.disconnect()
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
    async onDispose() {
    }
}