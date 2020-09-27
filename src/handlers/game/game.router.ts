import { file, pokemonTypeEnums } from "./game.controller"
import { Router } from 'express'

export const gameRouter = Router()


gameRouter.get('/', file)
gameRouter.get('/enums', pokemonTypeEnums)
gameRouter.get('/ingame', file)
gameRouter.get('/lobby', file)