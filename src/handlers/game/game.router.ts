import { file, pokemonTypeEnums, user } from "./game.controller"
import { Router } from 'express'
import { authUserGameSession } from "../../middlewares"

export const gameRouter = Router()


gameRouter.get('/', file)
gameRouter.get('/user', [authUserGameSession], user)
gameRouter.get('/enums', pokemonTypeEnums)
gameRouter.get('/ingame', file)
gameRouter.get('/lobby', file)