import { Router } from "express"
import { body, check, param } from "express-validator"
import {
    DeleteDoctor,
    GetDoctor,
    GetDoctores,
    PostDoctor,
    PutDoctor,
} from "../controllers/CDoctor"
import { errores } from "../helpers/middlewares"
import { existeDoctor, validarCedula } from "../helpers/verificacion"

const router: Router = Router()

router.get("/", GetDoctores)

router.get("/:id", [check("id").custom(existeDoctor), errores], GetDoctor)

router.post("/", PostDoctor)

router.put(
    "/:id",
    [
        param("id").custom(existeDoctor),
        body("cedula").custom(validarCedula),
        body("nombre", "Los nombres son requeridos").notEmpty(),
        body("apellidos", "Los apellidos son requeridos").notEmpty(),
        body("movil", "El móvil es requerido").notEmpty(),
        body("especialidad", "La especialidad es requerida")
            .isArray()
            .notEmpty(),

        errores,
    ],
    PutDoctor
)

router.delete("/:id", [param("id").custom(existeDoctor), errores], DeleteDoctor)

export default router
