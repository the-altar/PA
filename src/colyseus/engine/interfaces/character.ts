import { iSkill } from "./skill";

export interface iCharacter {
    name: string
    facepic: string
    description: string
    hitPoints: number
    energyGain: Array<number>
    type: { [key: string]: number }
    skills:Array<iSkill>
}