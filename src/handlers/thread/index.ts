import { Router } from 'express'
import { news, findThread, postThread, updateThread, postComment } from './thread.controller'
import { authenticate } from "../../middlewares"
const router: Router = Router()

router.get('/news', news)
router.get('/:id/:siteArea', findThread)
router.post('/', postThread)
router.put('/', updateThread)
router.post('/comment',[authenticate], postComment)


export const threadRouter = router