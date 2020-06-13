export interface iPlayer {
    username: string,
    avatarId: string,
    id: string
}

export class Player {
    private username:string
    private avatarId:string
    private id:string    
    private isTurn:boolean
    private energyPool:Array<number> 

    constructor(player:iPlayer){
        this.username = player.username
        this.id = player.id
        this.avatarId = player.avatarId
        this.isTurn = false
        this.energyPool = [0,0,0,0]
    }
    public setTurn(turn:boolean){
        this.isTurn = turn
    } 
    public getId():string{
        return this.id
    }
    public increaseEnergyPool(energyIndex:number){
        this.energyPool[energyIndex]++
    }
    public getEnergyPool():Array<number>{
        return this.energyPool
    }
}