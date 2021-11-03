import { Request, Response } from "express"
import { IPaciente } from "../interfaces"
import { Pacientes } from "../models"

const GetPacientes = async (req: Request, res: Response) => {
    const { limite = 10, pagina = 1 } = req.body,
        inicia: number = (pagina - 1) * limite

    const [total, pacientes] = await Promise.all([
        Pacientes.findAndCountAll().then(({ count }) => count),
        Pacientes.findAll({ limit: limite, offset: inicia }),
    ])

    if (total > 0) {
        const data = {
            total,
            pacientes,
            pagina: inicia + 1,
        }
        return res.status(200).json({ estado: 1, msj: "", data })
    }

    return res.status(200).json({
        estado: 2,
        msj: "No hay datos para mostrar",
        data: [],
    })
}

const PostPacientes = async (req: Request, res: Response) => {
    const { ...data } = req.body

    const crearPaciente = await Pacientes.create(data)

    if (crearPaciente) {
        return res.status(202).json({
            estado: 1,
            msj: "Creado con éxito",
            data: [],
        })
    }

    return res.status(500).json({
        estado: 2,
        msj: "Error al crear",
        data: [],
    })
}

const PutPaciente = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id),
        cedula: string = req.body.cedula

    const actualizarPaciente = await Pacientes.update(req.body, {
        where: { id, documentoIden: cedula },
    })

    if (actualizarPaciente) {
        return res
            .status(202)
            .json({ estado: 1, msj: "Actualizado con éxito", data: [] })
    }

    return res
        .status(500)
        .json({ estado: 2, msj: "Error al actualizar", data: [] })
}

export { GetPacientes, PostPacientes, PutPaciente }