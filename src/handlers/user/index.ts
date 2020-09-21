import {Router} from 'express'
import {userDataController, loggerMiddleware, userCharacters, register, login, logout} from "./user.controller"

const router:Router = Router()

router.use(loggerMiddleware)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/", userDataController)
router.get("/character", userCharacters)
export const userRouter = router;