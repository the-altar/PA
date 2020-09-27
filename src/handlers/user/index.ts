import { Router } from 'express'
import { loggerMiddleware, userCharacters, register, login, logout, mount, user} from "./user.controller"

const router: Router = Router()

router.get("/", loggerMiddleware, mount)
router.get("/character", userCharacters)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.post("/:username", user)

export const userRouter = router;