import { iEffect } from "../../interfaces"
import { Effect } from "./baseEffect"
import { DamageType, effectTargetBehavior, activationType } from "../../enums"
import { Character } from "../character";
import { Arena } from "../../arena";

interface iDamageParams {
    value: number,
    type: { [key: string]: number },
    damageBonus: Function
}

export class Damage extends Effect {
    private damage_value: number
    private damageType: DamageType

    constructor(data: iEffect, caster: number) {
        super(data, caster)
        this.damageType = data.damageType
        this.damage_value = data.damage_value
    }

    getDamageValue(): number {
        return this.damage_value
    }

    getDamageType(): DamageType {
        return this.damageType
    }

    public execute(targets: Array<Character>, world: Arena, skillType: { [key: string]: number }): boolean {
        
        const params = {
            value: this.damage_value,
            type: skillType,
            damageBonus: this.calculateDamageBonus
        }
        
        this.effectTargetApplication(params, this.dealDamage, targets, world)

        if (this.duration <= 0) return true
        return false
    }

    public dealDamage(params: iDamageParams, char: Character) {
        const {damageBonus, type, value} = params

        let damage = value * damageBonus(type, char)
        if (damage < 0) damage = 0
        const hp = char.geHitPoints() - Math.round(damage / 5) * 5
        char.setHitPoints(hp)
    }
} 