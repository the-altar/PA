import { Effect } from "./effect";
import { iEffect } from "../../interfaces";
import { Character } from "../../classes";
import { Arena } from "../../arena";
import { DebuffTypes } from "../../enums";


export class CooldownIncreasal extends Effect {

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

    public functionality(char: Character, skillType?:Array<any>) {
        char.setDebuff({
            debuffType: DebuffTypes.CooldownIncreasal,
            value: this.numTurns,
            specific: this.specific
        })
    }

}