import http from "http";
import { Room, Client, Delayed } from "colyseus";
import { Arena, iCharacter, Player } from "../../engine"
import { updateGameResults } from "../../handlers/user/user.controller"

interface iSkillCordinates {
    target?: number
    caster: number
    skill: number
}

interface iRegister {
    player: any,
    team: Array<iCharacter>
}

export class Battle extends Room {
    private arena: Arena = new Arena()
    private constructed: number = 0
    private evaluateGroupInterval = 60000
    private delay: Delayed
    // When room is initialized
    onCreate(options: any) {
        this.onMessage('end-game-turn', (client: Client, payload: any) => {
            this.delay.reset()
            this.arena.processTurn(payload)

            const { isOver, gameData, winner, loser } = this.arena.startGame(true)

            if (!isOver) this.broadcast("start-new-turn", gameData)
            else {
                const payload1 = endMatch(winner, loser, true)
                const payload2 = endMatch(loser, winner, false)

                this.broadcast("end-game", {
                    winner: { playerDdata: { ...winner }, results: { ...payload1 } },
                    loser: { playerDdata: { ...loser }, results: { ...payload2 } }
                })
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

        this.onMessage('surrender', (client: Client, id: number) => {
            const { winner, loser } = this.arena.surrender(id)

            const payload1 = endMatch(winner, loser, true)
            const payload2 = endMatch(loser, winner, false)

            this.broadcast("end-game", {
                winner: { playerData: { ...winner }, results: { ...payload1 } },
                loser: { playerData: { ...loser }, results: { ...payload2 } }
            })
            this.disconnect()
        })
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client: Client, options: any, request: http.IncomingMessage) {
        return true
    }

    // When client successfully join the room
    onJoin(client: Client, options: any, auth: any) {
        this.arena.addPlayer(options.player, options.team)
        this.constructed++
        if (this.constructed === 2) this.gameClock()
    }

    // When a client leaves the room
    onLeave(client: Client, consented: boolean) { }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    async onDispose() {
    }

    gameClock() {
        const { gameData } = this.arena.startGame()

        this.broadcast("game-started", gameData)

        this.delay = this.clock.setInterval(() => {
            const { isOver, gameData, winner, loser } = this.arena.startGame()

            if (!isOver) this.broadcast("start-new-turn", gameData)
            else {

                const payload1 = endMatch(winner, loser, true)
                const payload2 = endMatch(loser, winner, false)

                this.broadcast("end-game", {
                    winner: { playerDdata: { ...winner }, results: { ...payload1 } },
                    loser: { playerDdata: { ...loser }, results: { ...payload2 } }
                })
                this.disconnect()
            }

        }, this.evaluateGroupInterval)
    }
}

function calculateElo(p1: Player, p2: Player) {
    let eloGained: number = Math.floor(p2.season.elo + 400 * (p1.season.wins - p2.season.losses) / (p1.season.wins + p1.season.losses + 1))
    p1.season.elo += eloGained
}

function calculateExpGain(player: Player, p2: Player, isWinner: boolean) {

    if (isWinner) {
        const wVal = (150 * p2.season.seasonLevel) / player.season.seasonLevel
        const expGained = Math.min(Math.max(wVal, 150), 700)

        let hasLeveledUp = [false];
        player.season.exp += expGained
        levelUp(player, hasLeveledUp)

        return {
            leveledUp: hasLeveledUp[0], expGained
        }

    } else {

        const wVal = (150 * player.season.seasonLevel) / p2.season.seasonLevel
        const expLost = Math.min(Math.max(wVal, 100), 500)

        let hasLeveledDown = [false];
        player.season.exp = Math.max(0, (player.season.exp - expLost))
        levelDown(player, hasLeveledDown)

        return {
            leveledDown: hasLeveledDown, expLost
        }
    }
}

function levelUp(p: Player, hasLeveledUp: Array<boolean>) {
    const n = p.season.seasonLevel
    const reqExp = ((n * (n + 1)) / 2) * 350
    if (p.season.exp < reqExp) return
    else {
        p.season.seasonLevel++;
        hasLeveledUp[0] = true
        levelUp(p, hasLeveledUp)
    }
}

function levelDown(p: Player, hasLeveledDown: Array<boolean>) {
    const n = p.season.seasonLevel - 1
    const reqExp = ((n * (n + 1)) / 2) * 350

    if (p.season.exp < reqExp) {
        p.season.seasonLevel--;
        hasLeveledDown[0] = true
        levelDown(p, hasLeveledDown)
    }
}

function calculateMaxStreak(player: Player) {
    if (player.season.streak > player.season.maxStreak)
        player.season.maxStreak = player.season.streak
}

function winRate(player: Player, isWinner: Boolean) {
    if (isWinner) {
        player.season.wins++
        if(player.season.streak < 0) player.season.streak = 1
        else player.season.streak++
    } else {
        if(player.season.streak > 0) player.season.streak = 0
        player.season.streak--
        player.season.losses++
    }
}

function endMatch(p1: Player, p2: Player, isWinner: boolean) {
    winRate(p1, isWinner)
    calculateMaxStreak(p1)
    calculateElo(p1, p2)
    const coins = calculateCoins(p1, isWinner)
    const results = calculateExpGain(p1, p2, isWinner)

    updateGameResults({
        wins: p1.season.wins,
        losses: p1.season.losses,
        streak: p1.season.streak,
        elo: p1.season.elo,
        id: p1.getId(),
        exp: p1.season.exp,
        maxStreak: p1.season.maxStreak,
        seasonLevel: p1.season.seasonLevel,
        seasonRank: p1.season.seasonRank,
        season: 1,
        coins: p1.coins
    })

    return {
        playerId: p1.getId(),
        coins,
        ...results
    }
}

function calculateCoins(p: Player, isWinner:boolean) {
    if(!isWinner) return 0
    
    let coinsEarned = p.season.streak * 50
    coinsEarned = Math.min(Math.max(Math.floor(coinsEarned), 50), 600);
    p.coins += coinsEarned

    return coinsEarned
}