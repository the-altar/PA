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
    private knockedOut: boolean
    private buffs: {
        invulnerability: {[x:string]:boolean}
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
        this.knockedOut = false
        for (const skill of data.skills) {
            this.skills.push(new Skill(skill))
        }
    }

    public geHitPoints(): number {
        return this.hitPoints
    }

    public setHitPoints(hp: number): void {
        this.hitPoints = hp
        if(this.hitPoints <= 0){
            this.hitPoints = 0
            this.knockOut()
        }
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
            skill.enable()
            skill.validateCoolDown()
            skill.validateCost(pool)
            skill.setTargetChoices(chars, playerId, self)
        }
    }

    public validateSkillsCost(pool: Array<number>) {
        for (const skill of this.skills) {
            skill.enable()
            skill.validateCoolDown()
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

    public knockOut(){
        this.knockedOut= true
        this.disableSkills()
    }

    public isKnockedOut():boolean{
        return this.knockedOut
    }

    public disableSkills() {
        this.skills.forEach(s => {
            s.disabled = true
        })
    }

    public setInvulnerability(type:Types) {
        this.buffs.invulnerability[type]=true
    }
    public isInvulnerable(types:Array<string>):boolean{
        if(this.buffs.invulnerability[18]) return true 
        for(const t of types){
            if(this.buffs.invulnerability[t]) return true
        }
        return false
    }

    public clearBuffs(){
        this.buffs.invulnerability = {}
    }

    public getTyping(){
        return this.type
    }
}
