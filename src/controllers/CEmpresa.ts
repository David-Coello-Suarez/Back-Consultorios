import { Request, Response } from "express"
import { Empresa } from "../models"

const GetEmpresa = async (req: Request, res: Response) => {
    const { limite = 10, pagina = 1 } = req.body

    const inicia: number = (pagina - 1) * limite

    const [total, empresas] = await Promise.all([
        Empresa.findAndCountAll().then(({ count }) => count),
        Empresa.findAll({ limit: limite, offset: inicia }),
    ])

    if (total > 0) {
        const data = {
            empresas,
            total,
        }

        return res.status(200).json({ estado: 1, mensaje: "", data })
    } else {
        return res
            .status(200)
            .json({ estado: 2, mensaje: "No datos para mostrar", data: [] })
    }
}

const PostEmpresa = async (req: Request, res: Response) => {
    const { ...data } = req.body

    const crearEspecialidad = await Empresa.create(data)

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

export { GetEmpresa, PostEmpresa }
