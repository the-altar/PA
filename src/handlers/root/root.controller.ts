import { json } from "body-parser";
import { Request, Response } from "express"
import { verify } from 'jsonwebtoken'
import { pool } from "../../db"

export const baseController = async (req: Request, res: Response) => {
    return res.sendFile('index.html', { root: './public/main' });
}

export const uploadController = async (req: Request, res: Response) => {
    return res.json([{ "url": "/absolute/path/to/filename.png" }]);
}

export const news = async (req: Request, res: Response) => {
    const text = `select thread.id, thread.created_at as "createdAt", thread.title,  thread."content", jsonb_build_object('username', users.username, 'avatar', users.avatar) as "author" 
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

export const findNews = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const siteArea = Number(req.params.siteArea)

    const text = `select
	thread.id, thread.created_at as "createdAt", thread.title,  thread."content", jsonb_build_object('username', users.username, 'avatar', users.avatar) as "author",
	json_agg(posts.*) as comments
from
	thread
left join (
	select
		*
	from
		post
	join (
		select
			u.id as "userId", u.avatar, u.username, ur."name" as rank, count(post.id) as "postCount"
		from
			users as u
		left join user_rank as ur on
			u.user_rank_id = ur.id
		left join post on
			post.author = u.id
		group by
			u.id, ur."name" ) as poster on
        post.author = poster."userId"
        where id > 0 and id < 10
        order by post.id ASC
        ) as posts on
	thread.id = posts.thread_id
    and thread.site_area = posts.site_area
    left join users 
        on thread.author = users.id
where
	thread.id = $1
	and thread.site_area = $2
group by
	thread.id,
    thread.site_area,
    users.username,
    users.avatar;`

    try {
        const docs = await pool.query(text, [id, siteArea])
        return res.status(200).json({ success: true, records: docs.rows[0] })
    } catch (err) {
        console.log(err)
        return res.status(501).json({ success: false })
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

export const postComment = async (req: Request, res: Response) => {
    console.log(req.body)
    const text = `INSERT INTO post ("content",author,thread_id,site_area) values ($1, $2, $3, $4)`

    try {
        await pool.query(text, req.body)
    } catch (err) {
        res.status(501).end()
        throw (err)
    }
}

export const updateNews = async (req: Request, res: Response) => {
    const text = `UPDATE thread SET content = $2 where id = $1`
    try {
        await pool.query(text, req.body)
        return res.status(200).json({ success: true, content: req.body[1] })
    } catch (err) {
        return res.status(501).json({ success: false })
    }
}