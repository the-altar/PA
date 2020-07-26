import { iCharacter } from "../../interfaces"
import {Types} from "../../enums"
import { Skill } from "../skill"

export class Character {
    private name: string
    private facepic: string
    private description: string
    private id: number
    private hitPoints: number
    private isTarget:boolean 
    private buffs: {
        invulnerability: {[x:number]:boolean}
    }
    private type: { [key: string]: number }
    private energyGain: Array<number>
    private belongs: { [key: string]: boolean }
    private skills: Array<Skill>

    constructor(data: iCharacter, playerId: string) {        
        this.buffs = {
            invulnerability: {}
        }
        this.isTarget = false
        this.name = data.name
        this.id = Math.floor(Math.random() * (0 - 99999) + 99999);
        this.facepic = data.facepic
        this.description = data.description
        this.hitPoints = data.hitPoints
        this.type = data.type
        this.energyGain = data.energyGain
        this.belongs = {}
        this.belongs[playerId] = true
        this.skills = []
        for (const skill of data.skills) {
            this.skills.push(new Skill(skill))
        }

    }

    public geHitPoints(): number {
        return this.hitPoints
    }

    public setHitPoints(hp: number): void {
        this.hitPoints = hp
    }

    public belongsTo(id: string): boolean {
        return this.belongs[id]
    }

    public lowerCooldowns() {
        for(const skill of this.skills){
            skill.lowerCooldown()
        }
    }

    public generateEnergy(): number {
        let index = this.energyGain[Math.floor(Math.random() * this.energyGain.length)]
        if (index === 4) {
            index = Math.floor(Math.random() * 3)
        }
        return index
    }

    public getEnergyGain(): Array<number> {
        return this.energyGain
    }

    public getOwner(): string {
        return Object.keys(this.belongs)[0]
    }

    public validadeSkillsCompletely(pool: Array<number>, chars: Array<Character>, playerId: string, self?: number) {
        for (const skill of this.skills) {
            skill.validateCost(pool)
            skill.setTargetChoices(chars, playerId, self)
        }
    }

    public validateSkillsCost(pool: Array<number>) {
        for (const skill of this.skills) {
            skill.validateCost(pool)
        }
    }

    public getSkillByIndex(index: number): Skill {
        return new Skill(JSON.parse(JSON.stringify(this.skills[index])))
    }

    public setSkillCooldownByIndex(index:number){
        this.skills[index].startCooldown()
    }

    public enableSkills() {
        this.skills.forEach(s => {
            s.disabled = false
        })
    }

    public disableSkills() {
        this.skills.forEach(s => {
            s.disabled = true
        })
    }

    public setInvulnerability(type:Types) {
        console.log(type)
        this.buffs.invulnerability[type]=true
        console.log(this.buffs)
    }
    public isInvulnerable(type:Types):boolean{
        return this.buffs.invulnerability[type]
    }

    public clearBuffs(){
        this.buffs.invulnerability = {}
    }
}
