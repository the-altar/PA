import { effectType } from "../../enums"
import { Effect } from "./base"
import { Invulnerability } from "./invulnerability"
import { Damage, DamageReduction } from './damageRelated'
import { Healing, HealthDrain } from "./healthRelated"
import { CooldownReduction, CooldownIncreasal } from "./cooldownRelated"
import { EnergyGain } from "./energyRelated"
import { Stun } from "./stunRelated"
import { SkillTargetMod } from "./skillTargetMod"
import { Counter } from "./counter"
export * from "./base"

export const effectFactory = function (effect: any, caster: number): Effect {
    switch (effect.type) {
        case effectType.Damage: {
            return new Damage(effect, caster)
        }
        case effectType.Invulnerability: {
            return new Invulnerability(effect, caster)
        }
        case effectType.DamageReduction: {
            return new DamageReduction(effect, caster)
        }
        case effectType.CooldownReduction: {
            return new CooldownReduction(effect, caster)
        }
        case effectType.CooldownIncreasal: {
            return new CooldownIncreasal(effect, caster)
        }
        case effectType.Healing: {
            return new Healing(effect, caster)
        }
        case effectType.HealthDrain: {
            return new HealthDrain(effect, caster)
        }
        case effectType.EnergyGain: {
            return new EnergyGain(effect, caster)
        }
        case effectType.Stun: {
            return new Stun(effect, caster)
        }
        case effectType.SkillTargetMod: {
            return new SkillTargetMod(effect, caster)
        }
        case effectType.Counter: {
            return new Counter(effect, caster)
        } 
        default: {
            return new Effect(effect, caster)
        }
    }

}
