"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(player) {
        this.username = player.username;
        this.id = player.id;
        this.avatarId = player.avatarId;
        this.isTurn = false;
        this.energyPool = [0, 0, 0, 0];
    }
    setTurn(turn) {
        this.isTurn = turn;
    }
    getId() {
        return this.id;
    }
    increaseEnergyPool(energyIndex) {
        this.energyPool[energyIndex]++;
    }
    getEnergyPool() {
        return this.energyPool;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map