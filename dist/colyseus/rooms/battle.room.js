"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Battle = void 0;
const colyseus_1 = require("colyseus");
const engine_1 = require("../../engine");
const user_controller_1 = require("../../handlers/user/user.controller");
class Battle extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.arena = new engine_1.Arena();
        this.constructed = 0;
        this.evaluateGroupInterval = 60000;
    }
    // When room is initialized
    onCreate(options) {
        this.onMessage('end-game-turn', (client, payload) => {
            this.delay.reset();
            this.arena.processTurn(payload);
            const { isOver, gameData, winner, loser } = this.arena.startGame(true);
            if (!isOver)
                this.broadcast("start-new-turn", gameData);
            else {
                const payload1 = endMatch(winner, loser, true);
                const payload2 = endMatch(loser, winner, false);
                this.broadcast("end-game", {
                    winner: { playerDdata: Object.assign({}, winner), results: Object.assign({}, payload1) },
                    loser: { playerDdata: Object.assign({}, loser), results: Object.assign({}, payload2) }
                });
                this.disconnect();
            }
        });
        this.onMessage('add-skill-to-queue', (client, cordinates) => {
            const payload = this.arena.addSkillToTempQueue(cordinates);
            client.send('update-temp-queue', payload);
        });
        this.onMessage('remove-skill-from-queue', (client, cordinates) => {
            const payload = this.arena.removeSkillFromTempQueue(cordinates);
            client.send('update-temp-queue', payload);
        });
        this.onMessage('surrender', (client, id) => {
            const { winner, loser } = this.arena.surrender(id);
            const payload1 = endMatch(winner, loser, true);
            const payload2 = endMatch(loser, winner, false);
            this.broadcast("end-game", {
                winner: { playerData: Object.assign({}, winner), results: Object.assign({}, payload1) },
                loser: { playerData: Object.assign({}, loser), results: Object.assign({}, payload2) }
            });
            this.disconnect();
        });
    }
    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth(client, options, request) {
        return true;
    }
    // When client successfully join the room
    onJoin(client, options, auth) {
        this.arena.addPlayer(options.player, options.team);
        this.constructed++;
        if (this.constructed === 2)
            this.gameClock();
    }
    // When a client leaves the room
    onLeave(client, consented) { }
    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    gameClock() {
        const { gameData } = this.arena.startGame();
        this.broadcast("game-started", gameData);
        this.delay = this.clock.setInterval(() => {
            const { isOver, gameData, winner, loser } = this.arena.startGame();
            if (!isOver)
                this.broadcast("start-new-turn", gameData);
            else {
                const payload1 = endMatch(winner, loser, true);
                const payload2 = endMatch(loser, winner, false);
                this.broadcast("end-game", {
                    winner: { playerDdata: Object.assign({}, winner), results: Object.assign({}, payload1) },
                    loser: { playerDdata: Object.assign({}, loser), results: Object.assign({}, payload2) }
                });
                this.disconnect();
            }
        }, this.evaluateGroupInterval);
    }
}
exports.Battle = Battle;
function calculateElo(p1, p2) {
    let eloGained = Math.floor(p2.season.elo + 400 * (p1.season.wins - p2.season.losses) / (p1.season.wins + p1.season.losses + 1));
    p1.season.elo += eloGained;
}
function calculateExpGain(player, p2, isWinner) {
    if (isWinner) {
        const wVal = (150 * p2.season.seasonLevel) / player.season.seasonLevel;
        const expGained = Math.min(Math.max(wVal, 150), 700);
        let hasLeveledUp = [false];
        player.season.exp += expGained;
        levelUp(player, hasLeveledUp);
        return {
            leveledUp: hasLeveledUp[0], expGained
        };
    }
    else {
        const wVal = (150 * player.season.seasonLevel) / p2.season.seasonLevel;
        const expLost = Math.min(Math.max(wVal, 100), 500);
        let hasLeveledDown = [false];
        player.season.exp = Math.max(0, (player.season.exp - expLost));
        levelDown(player, hasLeveledDown);
        return {
            leveledDown: hasLeveledDown, expLost
        };
    }
}
function levelUp(p, hasLeveledUp) {
    const n = p.season.seasonLevel;
    const reqExp = ((n * (n + 1)) / 2) * 350;
    if (p.season.exp < reqExp)
        return;
    else {
        p.season.seasonLevel++;
        hasLeveledUp[0] = true;
        levelUp(p, hasLeveledUp);
    }
}
function levelDown(p, hasLeveledDown) {
    const n = p.season.seasonLevel - 1;
    const reqExp = ((n * (n + 1)) / 2) * 350;
    if (p.season.exp < reqExp) {
        p.season.seasonLevel--;
        hasLeveledDown[0] = true;
        levelDown(p, hasLeveledDown);
    }
}
function calculateMaxStreak(player) {
    if (player.season.streak > player.season.maxStreak)
        player.season.maxStreak = player.season.streak;
}
function winRate(player, isWinner) {
    if (isWinner) {
        player.season.wins++;
        if (player.season.streak < 0)
            player.season.streak = 1;
        else
            player.season.streak++;
    }
    else {
        if (player.season.streak > 0)
            player.season.streak = 0;
        player.season.streak--;
        player.season.losses++;
    }
}
function endMatch(p1, p2, isWinner) {
    winRate(p1, isWinner);
    calculateMaxStreak(p1);
    calculateElo(p1, p2);
    const coins = calculateCoins(p1, isWinner);
    const results = calculateExpGain(p1, p2, isWinner);
    user_controller_1.updateGameResults({
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
    });
    return Object.assign({ playerId: p1.getId(), coins }, results);
}
function calculateCoins(p, isWinner) {
    if (!isWinner)
        return 0;
    let coinsEarned = p.season.streak * 50;
    coinsEarned = Math.min(Math.max(Math.floor(coinsEarned), 50), 600);
    p.coins += coinsEarned;
    return coinsEarned;
}
//# sourceMappingURL=battle.room.js.map