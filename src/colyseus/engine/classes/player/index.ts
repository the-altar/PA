import { iPlayer } from "../../interfaces"

export class Player {
    private username: string
    private avatarId: string
    private id: string
    private isTurn: boolean
    private energyPool: Array<number>
    private payupCart: Array<number>
    private myChars: Array<number>

    constructor(player: iPlayer) {
        this.username = player.username
        this.id = player.id
        this.avatarId = player.avatarId
        this.isTurn = false
        this.energyPool = [0, 0, 0, 0, 0]
        this.payupCart = [0, 0, 0, 0, 0]
        this.myChars = []
    }
    public setMyCharsIndex(myChars:Array<number>){
        this.myChars = myChars
    }
    public getMyCharsIndex():Array<number>{
        return this.myChars
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
    public resetPayupCart() {
        this.payupCart = [0, 0, 0, 0, 0]
    }
    public removeFromPayupCart(cost: Array<number>) {
        this.payupCart = this.payupCart.map((a, i) => a - cost[i])
    }
    public addToPayupCart(cost: Array<number>) {
        this.payupCart = this.payupCart.map((a, i) => a + cost[i])
    }
    public increaseEnergyPool(energyIndex: number, value?: number) {
        if (!value) this.energyPool[energyIndex]++
        else this.energyPool[energyIndex] += value
    }
    public setTotalEnergyPool() {
        this.energyPool[4] = this.energyPool.slice(0, 4).reduce((ca, cv) => ca + cv)
    }
    public getEnergyPool(): Array<number> {
        return this.energyPool
    }
    public returnEnergy(cost: Array<number>): void {
        const total = cost.reduce((ca, cv) => ca + cv)
        for (let i = 0; i < 4; i++) {
            this.energyPool[i] = this.energyPool[i] + cost[i]
        }
        this.energyPool[4] += total
    }
    public consumeEnergy(cost: Array<number>): void {
        const total = cost.reduce((ca, cv) => ca + cv)
        for (let i = 0; i < 4; i++) {
            this.energyPool[i] = this.energyPool[i] - cost[i]
        }
        this.energyPool[4] -= total
    }
}