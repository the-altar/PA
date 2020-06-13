import { targetType, effectType, activationType } from './enums'

export interface iEffect {
    duration: number
    delay?: number
    linked?: boolean
    disabled?:boolean
    target: targetType
    type: effectType
    activationType: activationType
}

export class Effect {
    private duration:number
    private delay:number
    private disabled:boolean
    private linked:boolean
    private target: targetType
    private activationType: activationType
    
    constructor(effect:iEffect){
        this.duration = effect.duration || 0
        this.delay = effect.delay || 0
        this.linked = effect.linked || false
        this.target = effect.target
        this.disabled = effect.disabled || false
        this.activationType = effect.activationType
    }

}