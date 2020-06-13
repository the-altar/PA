import { Router } from 'express'
import { upload, getAll, remove, create, update} from './character.controller'

const router: Router = Router()
router.get("/", getAll)
router.post('/upload', upload)
router.post('/delete', remove)
router.post('/new', create)
router.post('/update', update)

export const characterRouter: Router = router 