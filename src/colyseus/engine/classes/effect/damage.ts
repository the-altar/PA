import { iEffect } from "../../interfaces"
import { Effect } from "./effect"
import { DamageType } from "../../enums"
import { Character } from "../character";
import { Arena } from "../../arena";

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

    public execute(targets: Array<Character>, world: Arena, skillType: Array<any>): boolean {
        const c = world.findCharacterById(this.caster)
        
        const {reduction} = c.getDebuffs().getDamageReduction({
            damageType: this.damageType,
            skillType: Number(skillType[0])
        })
        
        this.damage_value -= reduction            
        return this.effectTargetApplication(skillType, targets, world)
    }

    public functionality(char: Character, skillType?:Array<any>) {
        let damage = this.damage_value * this.calculateDamageBonus(skillType, char)
        if (damage < 0) damage = 0
        const hp = char.geHitPoints() - Math.round(damage / 5) * 5
        char.setHitPoints(hp)
    }
} 