import { iEffect } from "../../interfaces"
import { Effect } from "./baseEffect"
import { DamageType, effectTargetBehavior, activationType } from "../../enums"
import { Character } from "../character";
import { Skill } from "../skill";

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

    public execute(targets: Array<Character>, skillList:Array<Skill>): boolean {
        this.tick++
        if (this.tick % 2 === 0) return false

        this.delay -= 1
        if (this.delay >= 0) return false
        
        this.duration -= 1;
        
        switch (this.behavior) {
            case effectTargetBehavior.Default: {
                for (const char of targets) {
                    const hp = char.geHitPoints() - this.damage_value
                    char.setHitPoints(hp)
                }
            } break;

            case effectTargetBehavior.OnlyOne: {
                const hp = targets[0].geHitPoints() - this.damage_value
                targets[0].setHitPoints(hp)
            } break;

            case effectTargetBehavior.AllOthers: {
                for (const char of targets.slice(1, targets.length)) {
                    const hp = char.geHitPoints() - this.damage_value
                    char.setHitPoints(hp)
                }
            } break
        }

        if (this.duration <= 0) return true
        return false
    }

} 