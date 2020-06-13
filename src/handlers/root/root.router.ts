import {Router} from 'express'
import {baseController} from './root.controller'

const router: Router = Router()

router.get('/', baseController)

export const rootRouter = router