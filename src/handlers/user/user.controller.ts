import { Request, Response, NextFunction } from "express"
import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { pool } from "../../db"

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.session_id
        if (token) {
            const u: any = await verify(token, process.env.TOKEN_SECRET as string)
            req.res.locals.user = u
            req.res.locals.guest = false
        } else req.res.locals.guest = true
        next()
    } catch (err) {
        res.status(401).end()
        throw (err)
    }
}

export const mount = async function (req: Request, res: Response) {

    if (req.res.locals.guest) {
        return res.json({ authLevel: -1, auth: false })
    }
    const u = req.res.locals.user
    return res.json({
        username: u.username,
        authLevel: u.authLevel,
        id: u.id,
        auth: u.auth
    })

}

export const userCharacters = async (req: Request, res: Response) => {
    const text = `select jsonb_build_object('id', entity.id) || entity.data || 
    jsonb_build_object('skills', jsonb_agg(skills.data)) as data 
    from entity join (select skill.id, skill.data || 
    jsonb_build_object('id', skill.id) || jsonb_build_object('effects', jsonb_agg( effect.data || 
    jsonb_build_object('id', effect.id))) as data, skill.entity_id from skill 
    join effect on effect.skill_id = skill.id group by skill.id 
    ) as skills on skills.entity_id = entity.id group by entity.id;`

    try {
        const r = await pool.query(text)
        return res.json(r.rows)

    } catch (err) {
        res.status(500)
        return res.send("Something went wrong...")
    }
}

export const register = async (req: Request, res: Response) => {
    const text = `INSERT INTO users (username, passhash, email) values ($1, $2, $3);`
    try {
        const hashed = await hash(req.body.password, 10)
        await pool.query(text, [req.body.username, hashed, req.body.email])
        return res.json({ success: true })
    } catch (err) {
        return res.json({ success: false, err: err })
    }
}

export const login = async (req: Request, res: Response) => {
    const text = `select u.id, u.username, u.passhash, ur.auth_level as "authLevel"
    from users as u
    left join user_rank as ur 
        on u.user_rank_id = ur.id
    where u.username = $1;`

    try {
        const data = await pool.query(text, [req.body.username])
        const user = data.rows[0]
        const match = await compare(req.body.password, user.passhash)

        if (match) {
            delete user.passhash
            const token = sign({
                id: user.id,
                authLevel: user.authLevel,
                auth: true,
                username: user.username
            }, process.env.TOKEN_SECRET, { expiresIn: '365d' })

            res.cookie('session_id', token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 })
            return res.json({ userData: user, success: true })
        }
        return res.json({ success: false })

    } catch (err) {
        throw (err)
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("session_id")
    return res.status(200).end()
}

export const user = async (req: Request, res: Response) => {

    const username = req.body.username || req.params.username

    const text = `select u.id, u.avatar, u.username, 
    jsonb_build_object('elo', lb.elo, 'wins', lb.wins, 'losses', lb.losses, 'streak', lb.streak, 'maxStreak', lb.max_streak, 'exp', lb.experience, 'seasonRank', lb.season_rank, 'seasonLevel', lb.season_level) as season, 
    jsonb_build_object('authLevel', ur.auth_level, 'rankName', ur."name") as rank 
    from users as u 
    left join ladderboard as lb 
        on u.id = lb.user_id 
    left join user_rank as ur 
        on u.user_rank_id = ur.id
    where u.username = $1;
    `
    try {
        const doc = await pool.query(text, [username])
        res.status(200).json(doc.rows[0])
    } catch (err) {
        throw (err)
    }

}

export const updateGameResults = async (payload: {
    wins: number,
    losses: number,
    elo: number,
    streak: number,
    maxStreak: number,
    exp: number,
    seasonLevel: number,
    seasonRank: string,
    season: number,
    id: number,
    coins: number,
}) => {
    if (payload.id < 0) return
    const text = `
    INSERT INTO ladderboard (season, user_id, wins, losses, elo, streak, max_streak, experience, season_level, season_rank)
    values ($9,$10,$1,$2,$3,$4,$5,$6,$7,$8)
    on conflict (season, user_id) do update 
    set 
        wins = $1, 
        losses = $2,	
        elo = $3,
        streak = $4, 
        max_streak = $5, 
        experience = $6,
        season_level = $7,
        season_rank = $8;`
    const userText = `update users set coins=$1 where id=$2`;
    const { wins, losses, streak, elo, id, exp, maxStreak, seasonLevel, seasonRank, coins } = payload
    const values = [wins, losses, elo, streak, maxStreak, exp, seasonLevel, seasonRank, 0, id]

    try {
        await pool.query(text, values)
        await pool.query(userText, [coins, id])
    } catch (err) {
        throw (err)
    }
}

/*const generateGuest = () => {
    return {
        "rank":
            { "authLevel": -1, "rankName": "Guest" },
        "id": Math.floor((Math.random() * 1000000) + 1) * -1,
        "avatar": "1.jpg",
        "coins": 0,
        "username": `GUEST-${Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 2)}`,
        "season": {
            elo: 1000,
            wins: 0,
            losses: 0,
            streak: 0,
            exp: 0,
            maxStreak: 0,
            seasonRank: "Rookie",
            seasonLevel: 0
        }
    }
}*/