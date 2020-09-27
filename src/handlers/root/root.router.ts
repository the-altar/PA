import {Router} from 'express'
import {baseController, uploadController, findNews, postNews, authenticateAdmin} from './root.controller'

const router: Router = Router()

router.get('/', baseController)
router.put('/upload', uploadController)
router.post('/upload', uploadController)
router.get("/news", findNews)
router.post("/news", authenticateAdmin, postNews)

export const rootRouter = router