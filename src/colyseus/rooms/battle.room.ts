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
                    winner: { playerData: { ...winner }, results: { ...payload1 } },
                    loser: { playerData: { ...loser }, results: { ...payload2 } }
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
                    winner: { playerData: { ...winner }, results: { ...payload1 } },
                    loser: { playerData: { ...loser }, results: { ...payload2 } }
                })
                this.disconnect()
            }

        }, this.evaluateGroupInterval)
    }
}

function probability(r1: number, r2: number) {
    return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (r1 - r2) / 400))
}

function calculateElo(p1: Player, p2: Player, isWinner: boolean) {
    const Pb = probability(p1.season.elo, p2.season.elo)
    let eloGained = 0

    if (isWinner) eloGained = p1.season.elo + 50 * (1 - Pb)
    else eloGained = p1.season.elo + 50 * (0 - Pb)

    p1.season.elo = Math.floor(eloGained)
}

function calculateExpGain(player: Player, p2: Player, isWinner: boolean) {

    if (isWinner) {
        const levelDifference = p2.season.seasonLevel - player.season.seasonLevel
        const expGained = Math.min(Math.max(50 * levelDifference, 150), 600)

        let hasLeveledUp = [false];
        player.season.exp += expGained
        levelUp(player, hasLeveledUp)

        return {
            leveledUp: hasLeveledUp[0], expGained
        }

    } else {

        const levelDifference = player.season.seasonLevel - p2.season.seasonLevel
        const expLost = Math.min(Math.max(50 * levelDifference, 50), 300)

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
        validateRanking(p)
        hasLeveledUp[0] = true
        levelUp(p, hasLeveledUp)
    }
}

function levelDown(p: Player, hasLeveledDown: Array<boolean>) {
    const n = p.season.seasonLevel - 1
    const reqExp = ((n * (n + 1)) / 2) * 350

    if (p.season.exp < reqExp) {
        p.season.seasonLevel--;
        validateRanking(p)
        hasLeveledDown[0] = true
        levelDown(p, hasLeveledDown)
    }
}

function validateRanking(p: Player) {
    const lvl = p.season.seasonLevel
    if (lvl <= 5) p.season.seasonRank = "Rookie"
    else if (lvl >= 6 && lvl <= 10) p.season.seasonRank = "Novice"
    else if (lvl >= 11 && lvl <= 15) p.season.seasonRank = "Trainer"
    else if (lvl >= 16 && lvl <= 20) p.season.seasonRank = "Ace"
    else if (lvl >= 21 && lvl <= 25) p.season.seasonRank = "Veteran"
    else if (lvl >= 26 && lvl <= 30) p.season.seasonRank = "Gym Leader"
    else if (lvl >= 31 && lvl <= 35) p.season.seasonRank = "Challenger"
    else if (lvl >= 36 && lvl <= 40) p.season.seasonRank = "Elite 4"
    else p.season.seasonRank = "Champion"
}


function calculateMaxStreak(player: Player) {
    if (player.season.streak > player.season.maxStreak)
        player.season.maxStreak = player.season.streak
}

function winRate(player: Player, isWinner: Boolean) {
    if (isWinner) {
        player.season.wins++
        if (player.season.streak < 0) player.season.streak = 1
        else player.season.streak++
    } else {
        if (player.season.streak > 0) player.season.streak = 0
        player.season.streak--
        player.season.losses++
    }
}

function endMatch(p1: Player, p2: Player, isWinner: boolean) {
    winRate(p1, isWinner)
    calculateMaxStreak(p1)
    calculateElo(p1, p2, isWinner)
    const coins = calculateCoins(p1, isWinner)
    const results = calculateExpGain(p1, p2, isWinner)

    updateGameResults({
        wins: p1.season.wins || 0,
        losses: p1.season.losses || 0,
        streak: p1.season.streak || 0,
        elo: p1.season.elo || 0,
        id: p1.getId(),
        exp: p1.season.exp || 0,
        maxStreak: p1.season.maxStreak || 0,
        seasonLevel: p1.season.seasonLevel || 0,
        seasonRank: p1.season.seasonRank || "Rookie",
        season: 1,
        coins: p1.coins 
    })

    return {
        playerId: p1.getId(),
        coins,
        ...results
    }
}

function calculateCoins(p: Player, isWinner: boolean) {
    if (!isWinner) return 0

    let coinsEarned = p.season.streak * 50
    coinsEarned = Math.min(Math.max(Math.floor(coinsEarned), 50), 600);
    p.coins += coinsEarned

    return coinsEarned
}