import {Request, Response, NextFunction} from "express"
import {verify} from 'jsonwebtoken'

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.session_id
        if (!token) return res.status(401).json({success:false})

        const u: any = await verify(token, process.env.TOKEN_SECRET as string)
        if(!u.auth) return res.status(401).json({success:false})
        
        req.res.locals.id = u.id
        next()

    } catch (err) {
        res.status(401).json({success:false})
        throw (err)
    }
}


export async function authUserGameSession(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.session_id
        if (!token) return res.status(200).json(generateGuest())

        const u: any = await verify(token, process.env.TOKEN_SECRET as string)
        if(!u.auth) return res.status(200).json(generateGuest())
        
        req.res.locals.id = u.id
        next()

    } catch (err) {
        return res.status(200).json(generateGuest())
        throw (err)
    }
}

const generateGuest = () => {
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
}