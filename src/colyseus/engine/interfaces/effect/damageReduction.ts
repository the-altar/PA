import { Types, DamageType } from "../../enums";

export interface iDamageReduction {
    reductionValue?: number,
    typing?: Types,
    damageType?: DamageType 
}