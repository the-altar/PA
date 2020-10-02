import { Router } from 'express'
import { baseController, uploadController, news, postNews, updateNews, findNews, postComment } from './root.controller'
import { authenticateAdmin, authenticate } from "../../middlewares"
const router: Router = Router()

router.get('/', baseController)
router.put('/upload', uploadController)
router.post('/upload', uploadController)
router.get("/news", news)
router.get("/news/:id/:siteArea", findNews)
router.post("/news", [authenticateAdmin], postNews)
router.put("/news", [authenticateAdmin], updateNews)
router.post("/news/post", [authenticate], postComment)

export const rootRouter = router