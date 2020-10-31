import { Types, BuffTypes, DamageType, SkillClassType, effectType } from "../../enums"
import { Damage } from "../effect/damageRelated"
import { isHarmful } from "../effect/z.helpers"

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
    damageIncreasal: { [x: string]: { [x: string]: number } }
    absorbDamage: { [x: string]: { [x: string]: number } }
    destructibleDefense: number

    constructor() {
        this.invulnerability = {}
        this.cooldownReduction = { any: 0 }
        this.decreaseDamageTaken = {}
        this.damageIncreasal = {}
        this.absorbDamage = {}
        this.destructibleDefense = 0;
    }

    public setInvulnerability(params: iBuffParams) {
        const { skillType } = params
        this.invulnerability[skillType] = true
    }

    public isInvulnerable(types: Array<Types>, eType: effectType): boolean {
        if (!isHarmful(eType)) return false
        if (this.invulnerability[Types.Any]) return true
        for (const t of types) {
            if (this.invulnerability[t]) return true
        }
        return false
    }

    public setDecreaseDamageTaken(params: { damageType: DamageType, value: number, skillType: Types, class?: SkillClassType }) {
        const { damageType, value, skillType } = params

        if (this.decreaseDamageTaken[skillType] === undefined) {
            this.decreaseDamageTaken[skillType] = {
                [damageType]: value
            }
        } else {
            this.decreaseDamageTaken[skillType][damageType] += value
        }
    }

    public getDecreaseDamageTaken(params: { damageType: DamageType, skillType: Types, class?: SkillClassType }) {
        const { skillType, damageType } = params
        const res = {
            decreased: 0,
            hasBeenDecreased: false
        }

        if (this.decreaseDamageTaken[Types.Any] !== undefined) {
            res.decreased += this.decreaseDamageTaken[Types.Any][damageType] || 0
            res.decreased += this.decreaseDamageTaken[Types.Any][DamageType.True] || 0
            res.hasBeenDecreased = true
        }

        if (skillType !== Types.Any) {
            if (this.decreaseDamageTaken[skillType] !== undefined) {

                res.decreased += this.decreaseDamageTaken[skillType][DamageType.True] || 0

                if (this.decreaseDamageTaken[skillType][damageType] !== undefined) {
                    res.decreased += this.decreaseDamageTaken[skillType][damageType] || 0
                    res.hasBeenDecreased = true
                }
            }
        }

        return res
    }

    public setDamageIncreasal(params: { skillType: Types, value: number, damageType: DamageType }) {
        const { skillType, damageType, value } = params
        if (this.damageIncreasal[skillType] === undefined) {
            this.damageIncreasal[skillType] = {
                [damageType]: value
            }
        } else {
            this.damageIncreasal[skillType][damageType] += value
        }
    }

    public getDamageIncreasal(params: { skillType: Types, damageType: DamageType }) {
        const { skillType, damageType } = params
        const res = {
            increased: 0,
            hasBeenIncreased: false
        }

        if (this.damageIncreasal[Types.Any] !== undefined) {
            res.increased += this.damageIncreasal[Types.Any][damageType] || 0
            res.hasBeenIncreased = true
        }

        if (skillType !== Types.Any) {
            if (this.damageIncreasal[skillType] !== undefined) {
                if (this.damageIncreasal[skillType][damageType] !== undefined) {
                    res.increased += this.damageIncreasal[skillType][damageType] || 0
                    res.hasBeenIncreased = true
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

    public setAbsorbDamage(params: { skillType: Types, value: number, damageType: DamageType }) {
        const { skillType, damageType, value } = params
        if (this.absorbDamage[skillType] === undefined) {
            this.absorbDamage[skillType] = {
                [damageType]: value
            }
        } else {
            this.absorbDamage[skillType][damageType] += value
        }
    }

    public getAbsorbDamage(params: { skillType: Types, damageType: DamageType }) {
        const { skillType, damageType } = params
        const res = {
            conversionRate: 0,
            hasBeenAbsorbed: false
        }

        if (this.absorbDamage[Types.Any] !== undefined) {

            const t = this.absorbDamage[Types.Any][DamageType.True] || 0
            res.conversionRate += (this.absorbDamage[Types.Any][damageType] || 0) + t
            res.hasBeenAbsorbed = true
        }

        if (skillType !== Types.Any) {
            if (this.absorbDamage[skillType] !== undefined) {

                const t = this.absorbDamage[skillType][DamageType.True] || 0
                if (this.absorbDamage[skillType][damageType] !== undefined) {
                    res.conversionRate += this.absorbDamage[skillType][damageType] || 0
                    res.hasBeenAbsorbed = true
                }
                if (t > 0) res.hasBeenAbsorbed = true
                res.conversionRate += t
            }
        }

        return res
    }

    public clearCooldownReduction() {
        this.cooldownReduction = { any: 0 }
    }

    public clearInvulnerability() {
        this.invulnerability = {}
    }

    public clearDamageIncreasal() {
        this.damageIncreasal = {}
    }

    public clearDecreaseDamageTaken() {
        this.decreaseDamageTaken = {}
    }

    public clearAbsorbDamage() {
        this.absorbDamage = {}
    }

    public clearDestructibleDefense() {}

    public setDestructibleDefense(dd: number) {
        this.destructibleDefense += dd;
    }
    
    public getDestructibleDefense() {
        return this.destructibleDefense
    }
}


