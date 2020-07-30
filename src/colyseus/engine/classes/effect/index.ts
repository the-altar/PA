import {iEffect} from "../../interfaces"
import {effectType} from "../../enums"
import {Damage} from './damage'
import { Effect } from "./effect"
import { Invulnerability } from "./invulnerability"
import { DamageReduction } from "./damageReduction"
import { CooldownReduction } from "./cooldownReduction"
import { CooldownIncreasal } from "./cooldownIncreasal"

export const effectFactory = function(effect:iEffect, caster:number):Effect{
    switch(effect.type){
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
        default: {
            return new Effect(effect, caster)
        }
    }        
    
}
