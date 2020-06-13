import {Character, iCharacter} from "./character"
import {iPlayer, Player} from './player'

export class Arena {
    private players: Array<Player>
    private characters: Array<Character>
    private turnCount: number
    constructor() { 
        this.players = []
        this.characters = []
        this.turnCount = 0
    }

    public addPlayer(player:iPlayer, team:Array<iCharacter>):void {
        this.players.push(new Player(player))
        for(let c of team){
            this.characters.push(new Character(c, player.id))
        }
    }

    public startGame() {
        const p1 = this.turnCount % 2
        let p2 = 0
        if(p1===0) p2 = 1 
        
        this.distributeEnergy(p2)
        this.validadeTeamSkills(p1)

        this.players[p1].setTurn(true)
        this.players[p2].setTurn(false)
        this.turnCount++

        return this.getClientData()
    }

    private distributeEnergy(index:number){
        const playerId = this.players[index].getId()

        this.characters.forEach(c=>{
            if(c.belongsTo(playerId)){
                const energyIndex = c.generateEnergy()
                this.players[index].increaseEnergyPool(energyIndex)
            }
        })
    } 

    private validadeTeamSkills(index:number){
        const playerId = this.players[index].getId()
        const pool = this.players[index].getEnergyPool()

        this.characters.forEach(c=>{
            if(c.belongsTo(playerId)){
                c.validateSkills(pool)
            }
        })
    }

    private getClientData(){
        return {
            players:this.players,
            characters:this.characters
        }
    }
}


