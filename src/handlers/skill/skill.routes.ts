import { Router } from 'express';
import { get, create, find, update } from './skill.controller';

const router:Router = Router()  

router.get("/", get);
router.get("/:id", find);
router.post("/delete");
router.post("/update", update);
router.post("/new", create);

export const skillRouter = router