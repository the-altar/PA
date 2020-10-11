import { Request, Response } from 'express'
import { Types, triggerClauseType, effectType, activationType, DamageType, CostTypes, SkillClassType, targetType, effectTargetBehavior } from "../../engine/enums"
import { pool } from "../../db"

export const file = async (req: Request, res: Response) => {
    return res.sendFile('index.html', { root: './public/game' });
}

export const pokemonTypeEnums = async (req: Request, res: Response) => {
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

export const user = async (req:Request, res:Response) => {
    const id = req.res.locals.id
    
    const text = `
        select
            u.id,
            u.avatar,
            u.username,
            u.coins,
            jsonb_build_object('elo', lb.elo, 'wins', lb.wins, 'losses', lb.losses, 'streak', lb.streak, 'maxStreak', lb.max_streak, 'exp', lb.experience, 'seasonRank', lb.season_rank, 'seasonLevel', lb.season_level) as season,
            jsonb_build_object('authLevel', ur.auth_level, 'rankName', ur."name") as rank,
            array_agg(obtained_entity.entity_id) as unlocked
        from
            users as u
        left join ladderboard as lb on
            u.id = lb.user_id
        left join user_rank as ur on
            u.user_rank_id = ur.id
        left join obtained_entity on
            obtained_entity.user_id = u.id
        where
            u.id = $1
        group by
            (u.id,
            lb.elo,
            lb.wins,
            lb.losses,
            lb.streak,
            lb.max_streak,
            lb.experience,
            lb.season_rank,
            lb.season_level,
            ur.auth_level,
	        ur."name")
    `
    try {
        const doc = await pool.query(text, [id])
        res.status(200).json(doc.rows[0])
    } catch (err) {
        throw (err)
    }
}

