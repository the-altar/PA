import { Request, Response } from 'express'
import { pool } from "../../db"

export const create = async function (req: Request, res: Response) {
    const skill = [req.body]
    const text = "INSERT INTO skill (data) values ($1)";

    try {
        await pool.query(text, skill)
        return res.json({ code: 1 })
    } catch (err) {
        return res.json({ code: 0 })
    }

}

export const get = async function (req: Request, res: Response) {
    try {
        const data = await pool.query("SELECT * FROM skill");
        return res.json(data.rows)
    } catch (err) {
        return res.status(500);
    }
}

export const find = async function (req: Request, res: Response) {
    const id = req.params.id
    const value = [id]
    const text = "SELECT * FROM skill WHERE id = $1"

    try {
        const data = await pool.query(text, value)
        return res.json(data.rows[0])
    } catch (err) {
        return res.status(500)
    }
}

export const update = async function (req: Request, res: Response) {
    const text = "UPDATE skill SET data = $1, entity_id = $3 where id = $2"
    const values = req.body
    try {
        await pool.query(text, values)
        return res.json({code:1})
    } catch(err){
        return res.json({code:0})
    }

}