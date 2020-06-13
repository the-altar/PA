import { DamageType } from './enums'
import {Effect, iEffect} from "./effect"

export interface iDamage extends iEffect {
    damageType: DamageType,
    damage_value: number
}

export class Damage extends Effect{
    private damageType: DamageType
    private damage_value: number

    constructor(effectData: iDamage){
        super(effectData)
        this.damageType = effectData.damageType
        this.damage_value = effectData.damage_value
    }

    public getDamageType():DamageType {
        return this.damageType
    }

    public getDamageValue():number {
        return this.damage_value
    }
}
