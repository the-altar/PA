import { Effect } from "./effect";
import {iEffect} from "../../interfaces";
import {Character} from "../../classes";
import {Arena} from "../../arena";
import { DamageType, Types, DebuffTypes } from "../../enums";


export class DamageReduction extends Effect {

    private reductionValue: number
    private typing: Types
    private damageType: DamageType

    constructor(data: iEffect, caster: number){
        super(data, caster)
        this.reductionValue = data.reductionValue,
        this.typing = data.typing
        this.damageType = data.damageType
    }

    execute(targets: Array<Character>, world: Arena, skillType: Array<string>): boolean{
        return this.effectTargetApplication(skillType, targets, world)
    }

    public functionality(char:Character, skillType?:Array<any>){
        char.setDebuff({
            damageType: this.damageType,
            value: this.reductionValue,
            skillType: this.typing,
            debuffType: DebuffTypes.DamageReduction
        })
    }

}