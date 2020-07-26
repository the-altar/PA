import { iPlayer } from "../../interfaces"

export class Player {
    private username: string
    private avatarId: string
    private id: string
    private isTurn: boolean
    private energyPool: Array<number>
    private payupCart: Array<number>

    constructor(player: iPlayer) {
        this.username = player.username
        this.id = player.id
        this.avatarId = player.avatarId
        this.isTurn = false
        this.energyPool = [0, 0, 0, 0, 0]
        this.payupCart = [0, 0, 0, 0, 0]
    }
    public setTurn(turn: boolean) {
        this.isTurn = turn
    }
    public getId(): string {
        return this.id
    }
    public getPayupCart(): Array<number> {
        return this.payupCart
    }
    public resetPayupCart(){
        this.payupCart = [0, 0, 0, 0, 0]
    }
    public removeFromPayupCart(cost: Array<number>) {
        this.payupCart = this.payupCart.map((a, i) => a - cost[i])
    }
    public addToPayupCart(cost: Array<number>) {
        this.payupCart = this.payupCart.map((a, i) => a + cost[i])
    }

    public increaseEnergyPool(energyIndex: number) {
        this.energyPool[energyIndex]++
    }
    public getEnergyPool(): Array<number> {
        return this.energyPool
    }
    public returnEnergy(cost: Array<number>): void {
        for (let i = 0; i < 5; i++) {
            this.energyPool[i] = this.energyPool[i] + cost[i]
        }
    }
    public consumeEnergy(cost: Array<number>): void {
        for (let i = 0; i < 5; i++) {
            this.energyPool[i] = this.energyPool[i] - cost[i]
        }
    }
}