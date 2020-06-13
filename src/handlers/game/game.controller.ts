import {Request, Response} from 'express'

export const file = async (req:Request, res:Response) => {
    return res.sendFile('index.html', { root: './public/game' });
}