import { Types, BuffTypes, DamageType, SkillClassType } from "../../enums"

export interface iBuffParams {
    value?: number,
    buffType: BuffTypes,
    skillType?: Types,
    specific?: number
}


export class Buffs {
    invulnerability: { [x: string]: boolean }
    cooldownReduction: { [x: string]: number }
    decreaseDamageTaken: { [x: string]: { [x: string]: number } }

    constructor() {
        this.invulnerability = {}
        this.cooldownReduction = {any:0}
        this.decreaseDamageTaken = {}
    }

    public setInvulnerability(params: iBuffParams) {
        const { skillType } = params
        this.invulnerability[skillType] = true
    }

    public isInvulnerable(types: Array<Types>): boolean {
        if (this.invulnerability[Types.Any]) return true
        for (const t of types) {
            if (this.invulnerability[t]) return true
        }
        return false
    }

    public setDecreaseDamageTaken(params:{damageType:DamageType, value:number, skillType:Types, class?: SkillClassType}){
        const {damageType, value, skillType} = params 
        
        if(this.decreaseDamageTaken[skillType]===undefined) {
            this.decreaseDamageTaken[skillType] = {
                [damageType]: value
            } 
        } else {
            this.decreaseDamageTaken[skillType][damageType] += value 
        }
    }

    public getDecreaseDamageTaken(params:{damageType:DamageType, skillType:Types, class?: SkillClassType}){
        const { skillType, damageType } = params
        const res = {
            decreased: 0,
            hasBeenDecreased: false
        }

        if (this.decreaseDamageTaken[Types.Any] !== undefined) {
            res.decreased += this.decreaseDamageTaken[Types.Any][damageType] || 0
            res.hasBeenDecreased = true
        }

        if (skillType !== Types.Any) {
            if (this.decreaseDamageTaken[skillType] !== undefined) {
                if (this.decreaseDamageTaken[skillType][damageType] !== undefined) {
                    res.decreased += this.decreaseDamageTaken[skillType][damageType] || 0
                    res.hasBeenDecreased = true
                }
            }
        }
        
        return res
    }

    public setCooldownReduction(params: iBuffParams) {
        const { specific, value } = params

        if (specific) {
            this.cooldownReduction[specific] = value + (0 || this.cooldownReduction[specific])
        } else {
            this.cooldownReduction.any = value + (0 || this.cooldownReduction.any)
        }
    }

    public getCooldownReduction(specific?: number) {
        let r = this.cooldownReduction.any
        if (specific) {
            if (this.cooldownReduction[specific])
                r += this.cooldownReduction[specific]
        }
        return -r
    }

    public clearCooldownReduction(){
        this.cooldownReduction = {any:0}
    } 

    public clearInvulnerability(){
        this.invulnerability = {}
    } 
    
    public clearDecreaseDamageTaken(){
        this.decreaseDamageTaken = {}
    }
}


