import { Effect } from "./base"
import { DamageType, Types, DebuffTypes, triggerClauseType, activationType } from "../../enums"
import { Character } from "../character";
import {Skill} from "..";
import { Arena } from "../../arena";

export class Damage extends Effect {
    private damageType: DamageType

    constructor(data: any, caster: number) {
        super(data, caster)
        this.damageType = data.damageType
    }

    public functionality(char: Character, origin:Skill, world?:Arena) {
        const reduction = this.getDamageReduction(world, origin)
        let damage = (this.value-reduction) * this.calculateDamageBonus(origin, char)
        if (damage < 0) damage = 0

        const hp = char.geHitPoints() - Math.round(damage / 5) * 5
        char.setHitPoints(hp)
        if(char.isKnockedOut()){
            world.executeSkills(activationType.Immediate, triggerClauseType.onKnockOut)
        }
    }

    protected getDamageReduction(world:Arena, origin:Skill):number{
        const {char} = world.findCharacterById(this.caster)
        
        const {reduction} = char.getDebuffs().getDamageReduction({
            damageType: this.damageType,
            skillType: Number(origin.getTypes()[0])
        })

        return reduction
    }

    protected generateToolTip(){
        if(this.delay > 0){
            this.message = `this character will take ${this.value} damage for ${this.duration} turns in ${this.delay} turns`
        } else {
            this.message = `this.character will take ${this.value} damage` 
        }
    }
} 


export class DamageReduction extends Effect {

    private reduceType: Types
    private damageType: DamageType

    constructor(data: any, caster: number){
        super(data, caster)
        this.reduceType = data.reduceType
        this.damageType = data.damageType
    }
    
    public functionality(char:Character, origin:Skill){
        char.setDebuff({
            damageType: this.damageType,
            value: this.value,
            skillType: this.reduceType,
            debuffType: DebuffTypes.DamageReduction
        })
    }

    protected generateToolTip(){
        if(this.delay > 0){
            this.message = `This character will deal ${this.value} less damage in ${this.delay} turns`
        } else {
            this.message = `This character will deal ${this.value} less damage` 
        }
    }

}