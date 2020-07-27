import { iEffect } from "../../interfaces"
import { Character } from "../character"
import { Skill } from "../skill"
import { typeChart } from "../../helpers/typechart";
import { effectType, effectTargetBehavior, activationType, Types } from "../../enums"
import { Arena } from "../../arena";

export class Effect {
    protected tick: number
    protected duration: number
    protected delay?: number
    protected linked?: boolean
    protected disabled?: boolean
    protected behavior?: effectTargetBehavior
    protected activationType: activationType
    protected type: effectType

    constructor(data: iEffect) {
        this.tick = 0
        this.duration = data.duration
        this.delay = data.delay || 0
        this.disabled = data.disabled || false
        this.linked = data.linked || false
        this.type = data.type
        this.behavior = data.behavior || effectTargetBehavior.Default
        this.activationType = data.activationType || activationType.Immediate
    }

    public execute(targets: Array<Character>, world:Arena, skillType: { [key: string]: number }): boolean {
        return false
    }

    public getActivationType(): activationType {
        return this.activationType
    }

    protected calculateDamageBonus(skillType: { [key: string]: number }, char: Character): number {
        let mod = 1
        for (const typing in skillType) {
            for (const type in char.getTyping()) {
                mod *= typeChart(type, typing)
            }
        }
        return mod
    }

    public getType():effectType{
        return this.type
    }
}