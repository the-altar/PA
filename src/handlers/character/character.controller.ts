import { Request, Response } from 'express'
import { CharacterDB, ICharacterModel } from "../../models/character"
import { join } from 'path'
import { unlink, exists } from 'fs'
import { pool } from "../../db"

export const create = async (req: Request, res: Response) => {
    const [released, data] = req.body
    const values = [released, data]
    const text = "INSERT INTO entity (released, data) VALUES ($1, $2)"
    try {
        await pool.query(text, values)
        return res.json({ code: 1 })
    } catch (err) {
        throw (err)
    }
}

export const update = async (req: Request, res: Response) => {
    const [id, released, data] = req.body
    const values = [id, released, data]
    const text = "UPDATE entity SET released = $2, data = $3 WHERE id = $1"

    try {
        await pool.query(text, values)
        return res.json({ code: 1 })
    } catch (err) {
        return res.json({ code: 0 })
    }
}

export const find = async (req: Request, res: Response) => {
    try {
        const char = await pool.query("SELECT * from entity where entity.id = $1", [req.params.id])
        return res.json(char.rows[0])
    } catch (err) {
        console.error(err)
        return res.json({ code: 0 })
    }
}

export const remove = async (req: Request, res: Response) => {
    const char: ICharacterModel = req.body
    let pics: Array<string> = []

    char.skills.forEach(s => {
        pics.push(s.skillpic)
        pics.push(s.banner)
    })

    pics.push(char.facepic)
    pics.push(char.banner)

    pics.forEach(pic => {
        const p: string = join(process.cwd(), '/public/img/game/', pic + ".jpg")
        exists(p, (f) => {
            if (f) {
                unlink(p, () => { })
            }
        })
    })

    try {
        await CharacterDB.deleteOne({ _id: char._id })
        return res.json({ code: 1 })
    }
    catch (err) {
        console.error(err)
        return res.json({ code: 0 })
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const docs = await pool.query("SELECT * from entity")
        return res.json(docs.rows)
    } catch (err) {
        console.error(err)
        return res.json(false)
    }
}

export const getIds = async (req:Request, res:Response)=>{
    const text = "SELECT id, data -> 'name' AS name from entity";
    try {
        const r = await pool.query(text)
        return res.json(r.rows)
    }catch(err){
        return res.status(500).end()
    }
}

export const upload = async (req: Request, res: Response) => {
    for (const file in req.files) {
        const f: any = req.files[file]
        const p = join(process.cwd(), '/public/img/game/', f.name + ".jpg")
        f.mv(p, (err: any) => {
            if (err) {
                console.log(err)
                return res.status(500).json({})
            }
        })
    }

    return res.send('File uploaded!');
}

export const uploadFiles = async (req: Request, res: Response) => {
    const response = []
    for (const file in req.files) {
        const f: any = req.files[file]
        const p = join(process.cwd(), '/public/img/game/', req.params.filename + ".jpg")
        f.mv(p, (err: any) => {
            if (err) {
                return res.status(500).json({})
            }
            response.push({ url: `http://localhost:3000/img/game/${req.params.filename}.jpg` })
        })
    }
    return 1
}
