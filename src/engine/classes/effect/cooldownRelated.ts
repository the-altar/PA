import { Effect } from "./base";
import { Character } from "..";
import { DebuffTypes, BuffTypes } from "../../enums";
import { Skill } from "../skill";


export class CooldownIncreasal extends Effect {

    private specific?: number

    constructor(data: any, caster: number) {
        super(data, caster)
        this.specific = data.specific
    }

    public functionality(char: Character, origin:Skill) {
        this.triggered = true
        char.setDebuff({
            debuffType: DebuffTypes.CooldownIncreasal,
            value: this.value,
            specific: this.specific
        })
    }

    protected generateToolTip(){
        if(this.delay > 0){
            this.message = `Cooldown will be increased by ${this.value} if this character uses a skill in ${this.delay}`
        } else {
            this.message = `If this character uses a skill its cooldown will be increased by ${this.value}` 
        }
    }

}

export class CooldownReduction extends Effect {

    private specific?: number

    constructor(data: any, caster: number) {
        super(data, caster)
        this.specific = data.specific
    }

    public functionality(char: Character, origin:Skill) {
        this.triggered = true
        char.setBuff({
            buffType: BuffTypes.CooldownReduction,
            value: this.value,
            specific: this.specific
        })
    }

    protected generateToolTip(){
        if(this.delay > 0){
            this.message = `Cooldown will be decreased by ${this.value} if this character uses a skill in ${this.delay}`
        } else {
            this.message = `If this character uses a skill its cooldown will be decreased by ${this.value}` 
        }
    }

}

export class ResetCooldown extends Effect{
    private specificSkill:boolean
    private skillId:number

    constructor(data: any, caster: number) {
        super(data, caster)
        this.specificSkill = data.specificSkill || false
        this.skillId = data.skillId
    }

    public functionality(char: Character, origin:Skill) {
        for(const skill of char.getSkills()){
            if(this.specificSkill && this.skillId !== skill.getId()) continue
            skill.resetCooldown()
        }
    }

    protected generateToolTip(){
        this.message = "Active cooldowns will be reset"
    }
}