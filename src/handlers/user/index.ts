import {Router} from 'express'
import {userDataController, loggerMiddleware, userCharacters} from "./user.controller"

const router:Router = Router()

router.use(loggerMiddleware)
router.get("/", userDataController)
router.get("/character", userCharacters)
export const userRouter = router;