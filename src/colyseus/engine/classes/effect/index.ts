import {builtEffect, iEffect} from "../../interfaces"
import {effectType} from "../../enums"
import {Damage} from './damage'
import { Effect } from "./baseEffect"
import { Invulnerability } from "./invulnerability"

export const effectFactory = function(effect:iEffect):Effect{
    switch(effect.type){
        case effectType.Damage: {
            return new Damage(effect)
        }
        case effectType.Invulnerability: {
            return new Invulnerability(effect)
        }
    }        
}
