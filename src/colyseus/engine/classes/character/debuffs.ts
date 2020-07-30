import { Types, DamageType, DebuffTypes } from "../../enums"

export interface iDebuffParams {
    damageType?: DamageType,
    skillType?: Types,
    value?: number,
    debuffType?: DebuffTypes
    specific?:number
}

export class Debuffs {
    damageReduction: { [x: string]: { [x: string]: number } }
    cooldownIncreasal: { [x: string]: number }

    constructor() {
        this.damageReduction = {}
        this.cooldownIncreasal = {any:0}
    }

    public setDamageReduction(params: iDebuffParams) {
        const { skillType, damageType, value } = params
        this.damageReduction[skillType] = {
            [damageType]: value
        }
    }

    public getDamageReduction(params: iDebuffParams) {
        const { skillType, damageType } = params
        const res = {
            reduction: 0,
            hasBeenReduced: false
        }

        if(this.damageReduction[Types.Any]!==undefined) {
            res.reduction += this.damageReduction[Types.Any][damageType]
            res.hasBeenReduced = true
        }

        if(this.damageReduction[skillType]!==undefined){
            if(this.damageReduction[skillType][damageType] !== undefined) {
                res.reduction += this.damageReduction[skillType][damageType]
                res.hasBeenReduced = true
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

    public getCooldownIncreasal(specific?: number) {
        let r = this.cooldownIncreasal.any
        if (specific) {
            if (this.cooldownIncreasal[specific])
                r += this.cooldownIncreasal[specific]
        }
        return r
    }

    public clearDebuffs() {
        this.damageReduction = {}
        this.cooldownIncreasal = {any:0}
    }
}