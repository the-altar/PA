"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arena = void 0;
const character_1 = require("./character");
const player_1 = require("./player");
class Arena {
    constructor() {
        this.players = [];
        this.characters = [];
        this.turnCount = 0;
    }
    addPlayer(player, team) {
        this.players.push(new player_1.Player(player));
        for (let c of team) {
            this.characters.push(new character_1.Character(c, player.id));
        }
    }
    startGame() {
        const p1 = this.turnCount % 2;
        let p2 = 0;
        if (p1 === 0)
            p2 = 1;
        this.distributeEnergy(p2);
        this.validadeTeamSkills(p1);
        this.players[p1].setTurn(true);
        this.players[p2].setTurn(false);
        this.turnCount++;
        return this.getClientData();
    }
    distributeEnergy(index) {
        const playerId = this.players[index].getId();
        this.characters.forEach(c => {
            if (c.belongsTo(playerId)) {
                const energyIndex = c.generateEnergy();
                this.players[index].increaseEnergyPool(energyIndex);
            }
        });
    }
    validadeTeamSkills(index) {
        const playerId = this.players[index].getId();
        const pool = this.players[index].getEnergyPool();
        this.characters.forEach(c => {
            if (c.belongsTo(playerId)) {
                c.validateSkills(pool);
            }
        });
    }
    getClientData() {
        return {
            players: this.players,
            characters: this.characters
        };
    }
}
exports.Arena = Arena;
//# sourceMappingURL=arena.js.map