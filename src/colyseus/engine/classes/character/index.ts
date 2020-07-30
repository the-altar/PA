import { iCharacter } from "../../interfaces"
import {Types, BuffTypes, DebuffTypes} from "../../enums"
import { Skill } from "../skill"

// IMPORTANT TO THIS CLASS ONLY
import {Buffs, iBuffParams} from "./buffs";
import {Debuffs, iDebuffParams} from "./debuffs";

export class Character {
    private name: string
    private facepic: string
    private description: string
    private allies:Array<number>
    private enemies:Array<number>
    private id: number
    private hitPoints: number
    private isTarget:boolean 
    private knockedOut: boolean
    private buffs: Buffs
    private debuffs: Debuffs
    private type: { [key: string]: number }
    private energyGain: Array<number>
    private belongs: { [key: string]: boolean }
    private skills: Array<Skill>

    constructor(data: iCharacter, playerId: string) {        
        this.buffs = new Buffs()
        this.debuffs = new Debuffs()
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
        this.allies = []
        this.enemies = []
        this.knockedOut = false
        for (const skill of data.skills) {
            this.skills.push(new Skill(skill, this.id))
        }
    }

    public setAllies(allies:Array<number>){
        this.allies = allies
    }

    public getAllies():Array<number>{
        return this.allies
    }

    public getEnemies():Array<number>{
        return this.enemies
    }

    public setEnemies(enemies:Array<number>){
        this.enemies = enemies
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

    public lowerCooldowns(char:Character) {
        for(const skill of this.skills){
            skill.lowerCooldown(0)
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
        return new Skill(JSON.parse(JSON.stringify(this.skills[index])), this.id)
    }

    public setSkillCooldownByIndex(index:number){
        const n = this.buffs.getCooldownReduction() + this.debuffs.getCooldownIncreasal()
        this.skills[index].startCooldown(n)
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

    public setBuff(params:iBuffParams) {
        const {buffType} = params
        switch(buffType){
            case BuffTypes.Invulnerability: {
                this.buffs.setInvulnerability(params)
            }
            case BuffTypes.CooldownReduction: {
                this.buffs.setCooldownReduction(params)
            } 
        }
    }

    public setDebuff(params:iDebuffParams){
        switch(params.debuffType){
            case DebuffTypes.DamageReduction: {
                this.debuffs.setDamageReduction(params)
            }break;
            case DebuffTypes.CooldownIncreasal: {
                this.debuffs.setCooldownIncreasal(params)
            } 
        }
    }

    public isInvulnerable(types:Array<string>):boolean{
        return this.buffs.isInvulnerable(types)
    }

    public clearEnemyPhaseBuffs(){
        this.buffs.clearInvulnerability()
    }

    public clearPlayerPhaseBuffs(){
        this.buffs.clearCooldownReduction()
    }

    public getBuffs():Buffs{
        return this.buffs
    } 

    public getDebuffs():Debuffs {
        return this.debuffs
    }
    
    public clearDebuffs(){
        this.debuffs.clearDebuffs()
    }

    public getId():number {
        return this.id
    }
    
    public getTyping(){
        return this.type
    }
}
