import { Request, Response, NextFunction } from "express"
import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { pool } from "../../db"

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.session_id
        if (token) {
            req.res.locals.guest = false
            req.res.locals.user = await verify(token, process.env.TOKEN_SECRET as string)
        } else req.res.locals.guest = true
        next()
    } catch (err) {
        throw (err)
    }
}

export const userDataController = async function (req: Request, res: Response) {
    let user;
    if (req.res.locals.guest) {
        user = generateGuest()
        return res.json(user)
    }

    const text = `select json_build_object('authLevel', ur.auth_level, 'rankName', ur.name) as "rank", 
        u.id, u.avatar, u.username, u.passhash, u.wins, u.losses, u.streak, u.experience, u.elo from users as u
        join user_rank as ur
        on u.user_rank_id = ur.id
        where u.id = $1;`

    try {

        const id = req.res.locals.user.id
        const data = await pool.query(text, [id])
        delete data.rows[0].passhash
        return res.json(data.rows[0])

    } catch (err) {
        throw (err)
    }
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
        console.log(err)
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
    const text = `select json_build_object('authLevel', ur.auth_level, 'rankName', ur.name) as "rank", u.id, u.avatar, u.username, u.passhash, u.wins, u.losses, u.streak, u.experience, u.elo from users as u
    join user_rank as ur
    on u.user_rank_id = ur.id
    where u.username = $1;`

    try {
        const data = await pool.query(text, [req.body.username])
        const user = data.rows[0]
        const match = await compare(req.body.password, user.passhash)

        if (match) {
            delete user.passhash
            const token = sign({ id: user.id, authLevel: user.rank.authLevel }, process.env.TOKEN_SECRET, { expiresIn: '365d' })
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
    return res.json(generateGuest())
}

const generateGuest = () => {
    return {
        "rank":
            { "authLevel": -1, "rankName": "Guest" },
        "id": Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 12),
        "avatar": "1.jpg",
        "username": `GUEST-${Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 2)}`,
        "wins": 0,
        "losses": 0,
        "streak": 0,
        "experience": 0,
        "elo": 0
    }
}