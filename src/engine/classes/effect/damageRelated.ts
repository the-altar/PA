import { Effect } from "./base"
import { DamageType, Types, DebuffTypes, triggerClauseType, activationType, BuffTypes } from "../../enums"
import { Character } from "../character";
import { Skill } from "..";
import { Arena } from "../../arena";

export class Damage extends Effect {
    private damageType: DamageType

    constructor(data: any, caster: number) {
        super(data, caster)
        this.damageType = data.damageType
    }

    public functionality(char: Character, origin: Skill, world?: Arena) {
        const reduction = this.getDamageReduction(world, origin)
        const { increasal } = char.getDebuffs().getIncreasedDamage({ damageType: this.damageType, skillType: origin.getTypes()[0] })
        const { decreased } = char.getBuffs().getDecreaseDamageTaken({ damageType: this.damageType, skillType: origin.getTypes()[0] })
        

        let damage = (this.value - ((reduction + decreased) - increasal)) * this.calculateDamageBonus(origin, char)
        if (damage < 0) damage = 0

        const hp = char.geHitPoints() - Math.round(damage / 5) * 5
        char.setHitPoints(hp)

        if (char.isKnockedOut()) {
            world.executeSkills(activationType.Immediate, triggerClauseType.onKnockOut)
        }
    }

    protected getDamageReduction(world: Arena, origin: Skill): number {
        const { char } = world.findCharacterById(this.caster)

        const { reduction } = char.getDebuffs().getDamageReduction({
            damageType: this.damageType,
            skillType: Number(origin.getTypes()[0])
        })

        return reduction
    }

    protected generateToolTip() {
        if (this.delay > 0) {
            this.message = `this character will take ${this.value} damage for ${this.duration} turns in ${this.delay} turns`
        } else {
            this.message = `this.character will take ${this.value} damage`
        }
    }
}

export class DamageReduction extends Effect {

    private skillType: Types
    private damageType: DamageType

    constructor(data: any, caster: number) {
        super(data, caster)
        this.skillType = data.skillType
        this.damageType = data.damageType
    }

    public functionality(char: Character, origin: Skill) {
        char.setDebuff({
            damageType: this.damageType,
            value: this.value,
            skillType: this.skillType,
            debuffType: DebuffTypes.DamageReduction
        })
    }

    protected generateToolTip() {
        if (this.delay > 0) {
            this.message = `This character will deal ${this.value} less damage in ${this.delay} turns`
        } else {
            this.message = `This character will deal ${this.value} less damage`
        }
    }
}

export class IncreaseDamageTaken extends Effect {

    private skillType: Types
    private damageType: DamageType

    constructor(data: any, caster: number) {
        super(data, caster)
        this.skillType = data.skillType
        this.damageType = data.damageType
    }

    public functionality(char: Character, origin: Skill) {
        char.setDebuff({
            damageType: this.damageType,
            value: this.value,
            skillType: this.skillType,
            debuffType: DebuffTypes.IncreaseDamageTaken
        })
    }

    protected generateToolTip() {
        this.message = `This character will take ${this.value} more damage`
    }
}

export class DecreaseDamageTaken extends Effect {
    private skillType: Types
    private damageType: DamageType

    constructor(data: any, caster: number) {
        super(data, caster)
        this.skillType = data.skillType
        this.damageType = data.damageType
    }

    public functionality(char: Character, origin: Skill) {
        char.setBuff({
            damageType: this.damageType,
            value: this.value,
            skillType: this.skillType,
            buffType: BuffTypes.DecreaseDamageTaken
            //class?: SkillClassType;
        })
    }

    protected generateToolTip() {
        this.message = `This character has ${this.value} points of damage reduction`
    }
}