import { iEffect } from "../../interfaces"
import { Effect } from "./baseEffect"
import { DamageType, effectTargetBehavior, activationType } from "../../enums"
import { Character } from "../character";
import { Arena } from "../../arena";

export class Damage extends Effect {
    private damage_value: number
    private damageType: DamageType

    constructor(data: iEffect) {
        super(data)
        this.damageType = data.damageType
        this.damage_value = data.damage_value
    }

    getDamageValue(): number {
        return this.damage_value
    }

    getDamageType(): DamageType {
        return this.damageType
    }

    public execute(targets: Array<Character>, world:Arena, skillType: { [key: string]: number }): boolean {
        this.tick++
        if (this.tick % 2 === 0) return false

        this.delay -= 1
        if (this.delay >= 0) return false

        this.duration -= 1;
        switch (this.behavior) {
            case effectTargetBehavior.Default: {
                for (const char of targets) {
                    dealDamage(this.damage_value, skillType, char, this.calculateDamageBonus)
                }
            } break;

            case effectTargetBehavior.OnlyOne: {
                dealDamage(this.damage_value, skillType, targets[0], this.calculateDamageBonus)
            } break;

            case effectTargetBehavior.AllOthers: {
                for (const char of targets.slice(1, targets.length)) {
                    dealDamage(this.damage_value, skillType, char, this.calculateDamageBonus)
                }
            } break
        }

        if (this.duration <= 0) return true
        return false
    }
} 

function dealDamage(value:number, skillType:any, char:Character, bonus:Function) {
    let damage = value * bonus(skillType, char)
    if (damage < 0) damage = 0
    const hp = char.geHitPoints() - Math.round(damage / 5) * 5
    char.setHitPoints(hp)
}