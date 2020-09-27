import { Request, Response, NextFunction } from "express"
import { verify } from 'jsonwebtoken'
import { pool } from "../../db"

export async function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.session_id
        if (!token) return res.status(401).end()

        const u: any = await verify(token, process.env.TOKEN_SECRET as string)
        if(u.authLevel < 100) return res.status(401).end()

        else next()

    } catch (err) {
        res.status(401).end()
        throw (err)
    }
}

export const baseController = async (req: Request, res: Response) => {
    return res.sendFile('index.html', { root: './public/main' });
}

export const uploadController = async (req: Request, res: Response) => {
    return res.json([{ "url": "/absolute/path/to/filename.png" }]);
}

export const findNews = async (req: Request, res: Response) => {
    const text = `select thread.created_at as "createdAt", thread.title,  thread."content", jsonb_build_object('username', users.username, 'avatar', users.avatar) as "author" 
    from thread 
    left join users 
        on thread.author = users.id 	
    where site_area=0
    order by created_at DESC
    limit 5;`

    try {
        const docs = await pool.query(text)
        res.status(200).json(docs.rows)
    } catch (err) {
        res.status(501).end()
        throw (err)
    }
}

export const postNews = async (req: Request, res: Response) => {
    //const {author, content, siteArea, title} = req.body
    const text = `insert into thread (site_area, title, content, author) values ($1, $2, $3, $4)`
    try {
        await pool.query(text, req.body)
    } catch (err) {
        res.status(501).end()
        throw (err)
    }
}