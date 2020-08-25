import {Request, Response} from 'express'
import {Types, triggerClauseType, effectType, activationType, DamageType, CostTypes, SkillClassType, targetType, effectTargetBehavior} from "../../engine/enums"

export const file = async (req:Request, res:Response) => {
    return res.sendFile('index.html', { root: './public/game' });
}

export const pokemonTypeEnums = async(req:Request, res:Response) => {
    return res.json({
        pokemonTypings: Types, 
        effectTypings: effectType,
        activationTypings: activationType,
        damageTypings: DamageType,
        costTypings: CostTypes,
        skillClassTypings: SkillClassType,
        targetModeTypings: targetType,
        effectTargetBehaviorTypings: effectTargetBehavior,
        triggerClauseTypings: triggerClauseType,
    })
}