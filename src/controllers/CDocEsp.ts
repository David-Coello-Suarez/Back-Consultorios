import { Request, Response } from "express"
import { QueryTypes } from "sequelize"
import { DocEspe, Doctores, Especialidades } from "../models"

const GetEsp = async (req: Request, res: Response) => {
    const idesp: number = Number(req.params.id)

    const todoespecialidad = await DocEspe.findAll({
        where: { idespecialidad: idesp },
        attributes: [],

        include: [
            {
                model: Doctores,
                attributes: { exclude: ["createdAt", "updatedAt", "estado"] },
            },
        ],
        raw: true,
    })

    if (todoespecialidad.length > 0) {
        return res.status(200).json({
            estado: 1,
            mensaje: "",
            data: todoespecialidad,
        })
    }

    return res.json(500).json({
        estado: 2,
        mensaje: "No hay datos para mostrar",
        data: [],
    })
}

const GetDoc = async (req: Request, res: Response) => {
    const iddoctor: number = Number(req.params.id)

    const todosDoctores = await DocEspe.findAll({
        where: {
            iddoctor,
        },
        attributes: [],

        include: [
            {
                attributes: ["id", "nombre"],
                model: Especialidades,
                right: true,
            },
        ],
        raw: true,
    })

    if (todosDoctores.length > 0) {
        return res.status(200).json({
            estado: 1,
            mensaje: "",
            data: todosDoctores,
        })
    }

    return res.json(500).json({
        estado: 2,
        mensaje: "No hay datos para mostrar",
        data: [],
    })
}

export { GetEsp, GetDoc }
