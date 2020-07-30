import { Types, BuffTypes } from "../../enums"

export interface iBuffParams {
    value?: number,
    buffType: BuffTypes,
    skillType?: Types,
    specific?: number
}

export class Buffs {
    invulnerability: { [x: string]: boolean }
    cooldownReduction: { [x: string]: number }

    constructor() {
        this.invulnerability = {}
        this.cooldownReduction = {any:0}
    }

    public setInvulnerability(params: iBuffParams) {
        const { skillType } = params
        this.invulnerability[skillType] = true
    }

    public isInvulnerable(types: Array<string>): boolean {
        if (this.invulnerability[Types.Any]) return true
        for (const t of types) {
            if (this.invulnerability[t]) return true
        }
        return false
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
}