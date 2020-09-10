import { Types, DamageType, DebuffTypes } from "../../enums"

export interface iDebuffParams {
    damageType?: DamageType,
    skillType?: Types,
    value?: number,
    debuffType?: DebuffTypes
    specific?: number
}

export class Debuffs {
    damageReduction: { [x: string]: { [x: string]: number } }
    increaseDamageTaken: { [x: string]: { [x: string]: number } }
    cooldownIncreasal: { [x: string]: number }
    stun: { [x: string]: boolean }

    constructor() {
        this.damageReduction = {}
        this.increaseDamageTaken = {}
        this.cooldownIncreasal = { any: 0 }
        this.stun = { }
    }

    public setIncreasedDamage(params:iDebuffParams){
        const {skillType, damageType, value} = params
        if(this.increaseDamageTaken[skillType]===undefined) {
            this.increaseDamageTaken[skillType] = {
                [damageType]: value
            } 
        } else {
            this.increaseDamageTaken[skillType][damageType] += value 
        }
    }

    public getIncreasedDamage(params: iDebuffParams) {
        const { skillType, damageType } = params
        const res = {
            increasal: 0,
            hasBeenIncreased: false
        }

        if (this.increaseDamageTaken[Types.Any] !== undefined) {
            res.increasal += this.increaseDamageTaken[Types.Any][damageType] || 0
            res.hasBeenIncreased = true
        }

        if (skillType !== Types.Any) {
            if (this.increaseDamageTaken[skillType] !== undefined) {
                if (this.increaseDamageTaken[skillType][damageType] !== undefined) {
                    res.increasal += this.increaseDamageTaken[skillType][damageType] || 0
                    res.hasBeenIncreased = true
                }
            }
        }
        
        return res
    }

    public setDamageReduction(params: iDebuffParams) {
        const { skillType, damageType, value } = params
        if(this.damageReduction[skillType]===undefined) {
            this.damageReduction[skillType] = {
                [damageType]: value
            } 
        } else {
            this.damageReduction[skillType][damageType] += value 
        }
    }

    public getDamageReduction(params: iDebuffParams) {
        const { skillType, damageType } = params
        const res = {
            reduction: 0,
            hasBeenReduced: false
        }

        if (this.damageReduction[Types.Any] !== undefined) {
            res.reduction += this.damageReduction[Types.Any][damageType] || 0
            res.hasBeenReduced = true
        }

        if (skillType !== Types.Any) {
            if (this.damageReduction[skillType] !== undefined) {
                if (this.damageReduction[skillType][damageType] !== undefined) {
                    res.reduction += this.damageReduction[skillType][damageType] || 0
                    res.hasBeenReduced = true
                }
            }
        }
        
        return res
    }

    public setCooldownIncreasal(params: iDebuffParams) {
        const { specific, value } = params

        if (specific) {
            this.cooldownIncreasal[specific] = value + (0 || this.cooldownIncreasal[specific])
        } else {
            this.cooldownIncreasal.any = value + this.cooldownIncreasal.any
        }
    }

    public getCooldownIncreasal(params?: any) {
        let r = this.cooldownIncreasal.any
        if (params === undefined) return r
        if (params.specific) {
            if (this.cooldownIncreasal[params.specific])
                r += this.cooldownIncreasal[params.specific]
        }
        return r
    }

    public setStun(params: iDebuffParams) {
        this.stun[params.specific] = true
    }

    public isStunned(params:any): boolean {
        if(this.stun[params]) return true
        return false
    }

    public clearDebuffs() {
        this.damageReduction = {}
        this.cooldownIncreasal = { any: 0 }
        this.stun = {}
    }
}