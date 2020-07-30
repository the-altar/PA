import { activationType, effectType, effectTargetBehavior } from "../../enums"
import { Character, Skill } from "../../classes/index"
import { iIvulnerability } from "./invulnerability"
import { iDamage } from "./damage"
import { iDamageReduction } from "./damageReduction"

interface iCooldownEffect {
    numTurns?:number,
    specific?:number
}


export interface iEffect extends iDamage, iIvulnerability, iDamageReduction, iCooldownEffect {
    duration: number
    delay?: number
    linked?: boolean
    disabled?: boolean
    onEnemyTurn?: boolean 
    tick:number,
    behavior?: effectTargetBehavior
    activationType: activationType
    type: effectType
}

export interface builtEffect {
    execute(targets: Array<Character>, skillList: Array<Skill>): boolean
    getActivationType(): activationType
}