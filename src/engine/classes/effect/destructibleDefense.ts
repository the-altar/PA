import { Effect } from "./base"
import { BuffTypes, activationType, triggerClauseType } from "../../enums"
import { Character } from "../character";
import { Skill } from "../skill";

export class DestructibleDefense extends Effect {

    public targetChar:Character
    public hasBeenApplied:boolean
    constructor(data: any, caster: number) {
        super(data, caster)
        this.targetChar = null
        this.hasBeenApplied = false
    }

    public functionality(char: Character, origin: Skill) {
        if(this.hasBeenApplied) return
        char.setBuff({
            buffType:BuffTypes.DestructibleDefense,
            value: this.value
        })
        this.targetChar = char
        this.hasBeenApplied = true
    }
    
    public progressTurn() {
        this.tick++

        if(this.targetChar !== null && this.value > this.targetChar.getBuffs().destructibleDefense){
            this.value = this.targetChar.getBuffs().destructibleDefense
        }

        this.generateToolTip()

        if (this.delay > 0) {
            this.delay--
            return this.tickOn()
        }

        this.duration--
        let { terminate, activate } = this.tickOn()
        if(this.value <= 0) terminate = true
        if(this.targets.length === 0 ) terminate = true
        if (terminate) this.effectConclusion()
        return { terminate, activate }
    }

    public effectConclusion(){
        if(this.targetChar !== null && this.value > 0) this.targetChar.getBuffs().destructibleDefense -= this.value
    }

    public generateToolTip(){
        this.message = `This character has ${this.value} destructible defense`
    }
}