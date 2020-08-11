import { iSkill } from "./skill";
import { Types } from "../enums";

export interface iCharacter {
    name: string
    facepic: string
    description: string
    hitPoints: number
    energyGain: Array<number>
    type: Array<Types> 
    skills:Array<iSkill>
}