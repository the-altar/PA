import { Request, Response, NextFunction } from "express"
import { memberRank } from "../../engine/enums"

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    if (req.cookies.session) {
        req.res.locals.hasCookie = true
    } else {
        req.res.locals.guest = true
    }
    next()
}

export const userDataController = async function (req: Request, res: Response) {
    let user;
    if (req.res.locals.guest) {
        user = generateGuest()
    }
    return res.json(user)
}

const generateGuest = () => {
    return {
        username: `GUEST-${Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 2)}`,
        rank: memberRank[memberRank.Guest],
        avatar: Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5),
    }
}