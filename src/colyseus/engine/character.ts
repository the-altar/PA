import { Skills, iSkillList } from "./skills"

export interface iCharacter extends iSkillList {
    name: string
    facepic: string
    description: string
    hitPoints: number
    energyGain: Array<number>
    type: { [key: string]: boolean }
}

export class Character extends Skills {
    private name: string
    private facepic: string
    private description: string
    private hitPoints: number
    private type: { [key: string]: boolean }
    private energyGain: Array<number>
    private belongs: { [key: string]: boolean }

    constructor(data:iCharacter, playerId:string){
        super(data.skills)
        this.name = data.name
        this.facepic = data.facepic
        this.description = data.description
        this.hitPoints = data.hitPoints
        this.type = data.type
        this.energyGain = data.energyGain
        this.belongs = {}
        this.belongs[playerId] = true 
    }

    public belongsTo(id:string):boolean {
        return this.belongs[id]
    }

    public generateEnergy():number{
        let index = this.energyGain[Math.floor(Math.random()*this.energyGain.length)]
        if(index === 4) {
            index = Math.floor(Math.random()*3)
        }  
        return index
    }

    public getEnergyGain():Array<number>{
        return this.energyGain
    }
}
