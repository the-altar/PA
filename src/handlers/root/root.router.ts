import {Router} from 'express'
import {baseController, uploadController} from './root.controller'

const router: Router = Router()

router.get('/', baseController)
router.put('/upload', uploadController)
router.post('/upload', uploadController)

export const rootRouter = router