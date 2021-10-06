import { Router } from "express"
import { check } from "express-validator"
import {
    DeleteEspecialidad,
    GetEspecialidad,
    GetEspecialidades,
    PostEspecialidad,
    PutEspecialidad,
} from "../controllers/CEspecialidad"
import { errores } from "../helpers/middlewares"
import { existeEspecialidad } from "../helpers/verificacion"

const router: Router = Router()

router.get("/", GetEspecialidades)

router.post("/", PostEspecialidad)

router.get(
    "/:id",
    [check("id").custom(existeEspecialidad), errores],
    GetEspecialidad
)

router.put(
    "/:id",
    [
        check("id").custom(existeEspecialidad),
        check("nombre", "El nombre es requerido").notEmpty(),
        errores,
    ],
    PutEspecialidad
)

router.delete(
    "/:id",
    check("id").custom(existeEspecialidad),
    DeleteEspecialidad
)

export default router
