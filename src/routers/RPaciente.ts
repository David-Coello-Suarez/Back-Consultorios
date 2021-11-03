import { Router } from "express"
import { body, check } from "express-validator"
import {
    GetPacientes,
    PostPacientes,
    PutPaciente,
} from "../controllers/CPaciente"
import { errores } from "../helpers/middlewares"
import { existePaciente, existePacienteNuevo } from "../helpers/verificacion"

const router: Router = Router()

router.get("/", GetPacientes)

router.post(
    "/",
    [body(["cedula", "correo"]).custom(existePacienteNuevo), errores],
    PostPacientes
)

router.put("/:id", [(check("id").custom(existePaciente), errores)], PutPaciente)

export default router
