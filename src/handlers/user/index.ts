import {Router} from 'express'
import {userDataController, loggerMiddleware} from "./user.controller"

const router:Router = Router()

router.use(loggerMiddleware)
router.get("/", userDataController)

export const userRouter = router;