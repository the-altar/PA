import { Effect } from "./effect";
import { iEffect } from "../../interfaces";
import { Character } from "../../classes";
import { Arena } from "../../arena";
import { BuffTypes } from "../../enums";


export class CooldownReduction extends Effect {

    private numTurns: number
    private specific?: number

    constructor(data: iEffect, caster: number) {
        super(data, caster)
        this.numTurns = data.numTurns
        this.specific = data.specific
    }

    public execute(targets: Array<Character>, world: Arena, skillType: Array<string>): boolean {
        return this.effectTargetApplication(skillType, targets, world)
    }

    public functionality(char:Character, skillType?:Array<any>) {
        char.setBuff({
            buffType: BuffTypes.CooldownReduction,
            value: this.numTurns,
            specific: this.specific
        })
    }

}