import { Request, Response } from "express"
import { Especialidades } from "../models"

const GetEspecialidades = async (req: Request, res: Response) => {
    const { limite = 10, pagina = 1 } = req.body

    const inicia: number = (pagina - 1) * limite

    const [total, especialidades] = await Promise.all([
        Especialidades.findAndCountAll().then(({ count }) => count),
        Especialidades.findAll({ limit: limite, offset: inicia }),
    ])

    if (especialidades.length > 0) {
        const data = {
            especialidades,
            total,
        }

        return res.status(200).json({ estado: 1, mensaje: "", data })
    } else {
        return res
            .status(200)
            .json({ estado: 2, mensaje: "No datos para mostrar", data: [] })
    }
}

const PostEspecialidad = async (req: Request, res: Response) => {
    const { ...data } = req.body

    const existeEspecialidad = await Especialidades.findOne({
        where: { nombre: data.nombre },
    })

    if (existeEspecialidad) {
        return res.status(200).json({
            estado: 2,
            mensaje: `La especialidad '${data.nombre}' ya existe`,
            data: [],
        })
    }

    const crearEspecialidad = await Especialidades.create(data)

    if (crearEspecialidad) {
        return res.status(202).json({
            estado: 1,
            mensaje: "Creado con exito",
            data: [],
        })
    } else {
        return res.status(202).json({
            estado: 2,
            mensaje: "Error al crear",
            data: [],
        })
    }
}

const GetEspecialidad = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    const existeEspecialidad = await Especialidades.findOne({
        where: { id },
        attributes: ["nombre"],
    })

    return res.status(200).json({
        estado: 1,
        mensaje: "",
        data: existeEspecialidad,
    })
}

const PutEspecialidad = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    const nombre: string = req.body.nombre

    const ActualizarEspecialidad = await Especialidades.update(
        { nombre },
        { where: { id } }
    )

    if (ActualizarEspecialidad) {
        return res.status(200).json({
            estado: 1,
            mensaje: "Actualizado con éxito",
            data: [],
        })
    } else {
        return res.status(404).json({
            estado: 2,
            mensaje: "Error al actualizar",
            data: [],
        })
    }
}

const DeleteEspecialidad = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    const EliminarEspecialidad = await Especialidades.update(
        { estado: 0 },
        { where: { id } }
    )

    if (EliminarEspecialidad) {
        return res.status(200).json({
            estado: 1,
            mensaje: "Eliminado con éxito",
            data: [],
        })
    } else {
        return res.status(404).json({
            estado: 2,
            mensaje: "Error al eliminar",
            data: [],
        })
    }
}

export {
    GetEspecialidades,
    PostEspecialidad,
    GetEspecialidad,
    PutEspecialidad,
    DeleteEspecialidad,
}
