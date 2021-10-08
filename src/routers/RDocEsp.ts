import { Router } from "express"
import { GetDoc, GetEsp } from "../controllers/CDocEsp"

const router: Router = Router()

router.get("/especialidad/:id", GetEsp)

router.get("/doctores/:id", GetDoc)

export default router
