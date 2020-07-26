import {targetType} from "../enums"
import {iEffect} from "../interfaces"

export interface iSkill {
    cost: Array<number>
    disabled?: boolean
    skillpic: string
    name: string
    description: string
    class: string
    startCooldown: number
    baseCooldown: number
    type: { [key: string]: number }
    targetChoices?: Array<number>
    limit: number
    effects: Array<iEffect>,
    target: targetType
}