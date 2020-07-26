"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(player) {
        this.username = player.username;
        this.id = player.id;
        this.avatarId = player.avatarId;
        this.isTurn = false;
        this.energyPool = [0, 0, 0, 0, 0];
        this.payupCart = [0, 0, 0, 0, 0];
    }
    setTurn(turn) {
        this.isTurn = turn;
    }
    getId() {
        return this.id;
    }
    getPayupCart() {
        return this.payupCart;
    }
    resetPayupCart() {
        this.payupCart = [0, 0, 0, 0, 0];
    }
    removeFromPayupCart(cost) {
        this.payupCart = this.payupCart.map((a, i) => a - cost[i]);
    }
    addToPayupCart(cost) {
        this.payupCart = this.payupCart.map((a, i) => a + cost[i]);
    }
    increaseEnergyPool(energyIndex) {
        this.energyPool[energyIndex]++;
    }
    getEnergyPool() {
        return this.energyPool;
    }
    returnEnergy(cost) {
        for (let i = 0; i < 5; i++) {
            this.energyPool[i] = this.energyPool[i] + cost[i];
        }
    }
    consumeEnergy(cost) {
        for (let i = 0; i < 5; i++) {
            this.energyPool[i] = this.energyPool[i] - cost[i];
        }
    }
}
exports.Player = Player;
//# sourceMappingURL=index.js.map