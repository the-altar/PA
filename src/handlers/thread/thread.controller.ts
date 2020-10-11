import { Request, Response } from "express"
import { pool } from "../../db"


export const news = async (req: Request, res: Response) => {
    const text = `
        SELECT t.id, t.created_at, t.title, t."content", t.post_count, 
            JSON_BUILD_OBJECT('username', u.username, 'avatar', u.avatar) as "author" 
        FROM thread AS t 
        LEFT JOIN users AS u 
            ON t.author = u.id 	
        WHERE t.site_area=0
        ORDER BY created_at DESC
        limit 5;`

    try {
        const docs = await pool.query(text)
        res.status(200).json(docs.rows)
    } catch (err) {
        res.status(501).end()
        throw (err)
    }
}

export const findThread = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const siteArea = Number(req.params.siteArea)

    const text = `
        SELECT t.id, t.created_at, t.post_count, t.title, t."content",
        JSON_BUILD_OBJECT('username', u.username, 'avatar', u.avatar) as "author"
        FROM
            thread as t
        LEFT JOIN users AS u
            ON u.id = t.author
        WHERE t.id = $1 AND t.site_area = $2;
    `

    try {
        const docs = await pool.query(text, [id, siteArea])
        return res.status(200).json(docs.rows[0])
    } catch (err) {
        res.status(501).json({ success: false })
        throw (err)
    }
}

export const postThread = async (req: Request, res: Response) => {
    //const {author, content, siteArea, title} = req.body
    const text = `insert into thread (site_area, title, content, author) values ($1, $2, $3, $4)`
    try {
        await pool.query(text, req.body)
        return res.status(200).json({ success: true })
    } catch (err) {
        res.status(501).end()
        throw (err)
    }
}

export const updateThread = async (req: Request, res: Response) => {
    const text = `UPDATE thread SET content = $2 where id = $1`
    try {
        await pool.query(text, req.body)
        return res.status(200).json({ success: true, content: req.body[1] })
    } catch (err) {
        return res.status(501).json({ success: false })
    }
}

export const postComment = async (req: Request, res: Response) => {
    const text = `INSERT INTO post ("content",author,thread_id,site_area) values ($1, $2, $3, $4)`
    const sql = `UPDATE thread SET post_count = post_count + 1 WHERE id = $1`
    try {
        await pool.query(text, req.body)
        await pool.query(sql, [req.body[3]])
    } catch (err) {
        res.status(501).end()
        throw (err)
    }
}