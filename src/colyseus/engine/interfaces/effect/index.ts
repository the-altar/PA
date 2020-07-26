import { activationType, effectType, effectTargetBehavior } from "../../enums"
import { Character, Skill } from "../../classes/index"
import { iIvulnerability } from "./invulnerability"
import { iDamage } from "./damage"

export interface iEffect extends iDamage, iIvulnerability {
    duration: number
    delay?: number
    linked?: boolean
    disabled?: boolean
    behavior?: effectTargetBehavior
    activationType: activationType
    type: effectType
}

export interface builtEffect {
    execute(targets: Array<Character>, skillList: Array<Skill>): boolean
    getActivationType(): activationType
}