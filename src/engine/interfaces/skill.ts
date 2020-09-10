import {targetType, Types, SkillClassType} from "../enums"

export interface iSkill {
    id:number
    cost: Array<number>
    disabled?: boolean
    skillpic: string
    name: string
    banner:string,
    uncounterable:boolean
    description: string
    class: SkillClassType
    startCooldown: number
    baseCooldown: number
    type: Array<Types>
    targetChoices?: {[x:string]:Array<number>}
    limit: number
    effects: Array<any>,
    targetMode: targetType,
    mods?: any
}