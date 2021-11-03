import { Router } from "express"
import { GetEmpresa, PostEmpresa } from "../controllers/CEmpresa"

const router: Router = Router()

router.get("/", GetEmpresa)

router.post("/", PostEmpresa)

export default router
