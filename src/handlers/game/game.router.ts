import { file } from "./game.controller"
import { Router } from 'express'

export const gameRouter = Router()

gameRouter.get('/', file)
gameRouter.get('/ingame', file)
gameRouter.get('/lobby', file)