import { Request, Response } from 'express'
import { CharacterDB, ICharacterModel } from "../../models/character"
import { join } from 'path'
import { unlink, exists } from 'fs'

export const create = async (req: Request, res: Response) => {
    try {
        await CharacterDB.create(req.body)
        return res.json({ code: 1 })
    } catch (err) {
        console.error(err)
        return res.json({ code: 0 })
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        await CharacterDB.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { upsert: true })
        return res.json({ code: 1 })
    } catch (err) {
        return res.json({ code: 0 })
    }
}

export const find = async (req: Request, res: Response) => {
    try {
        const char = await CharacterDB.findById(req.params.id)
        return res.json(char)
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
        exists(p, (f)=>{
            if(f) {
                unlink(p, ()=>{})
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
        const docs = await CharacterDB.find({})
        return res.json(docs)
    } catch (err) {
        console.error(err)
        return res.json(false)
    }
}

export const upload = async (req: Request, res: Response) => {
    for (const file in req.files) {
        const f:any = req.files[file]
        const p = join(process.cwd(), '/public/img/game/', f.name + ".jpg")
        f.mv(p, (err: any) => {
            if (err) {
                console.log(err)
                return res.status(500)
            }
        })
    }

    return res.send('File uploaded!');
}

export const uploadFiles = async (req: Request, res: Response) => {
    const response = []
    for (const file in req.files) {
        const f:any = req.files[file]
        const p = join(process.cwd(), '/public/img/game/', req.params.filename + ".jpg")
        f.mv(p, (err: any) => {
            if (err) {
                console.log(err)
                return res.status(500)
            }
            response.push({url:`http://localhost:3000/img/game/${req.params.filename}.jpg`})
        })
    }
    return 1
}
