import { Request, Response } from "express"
import { DocEspe, Doctores } from "../models"

const GetDoctores = async (req: Request, res: Response) => {
    const { limite = 10, pagina = 1 } = req.body

    const inicia: number = (pagina - 1) * limite

    const [total, doctores] = await Promise.all([
        Doctores.findAndCountAll().then(({ count }) => count),
        Doctores.findAll({ limit: limite, offset: inicia }),
    ])

    if (total > 0) {
        const data = {
            doctores,
            total,
        }

        return res.status(200).json({
            estado: 1,
            mensaje: "",
            data,
        })
    }

    return res.status(404).json({
        estado: 2,
        mensaje: "No hay datos para mostrar",
        data: [],
    })
}

const PostDoctor = async (req: Request, res: Response) => {
    const data = req.body

    const cedula = data.cedula

    const especialidads: Array<number> = data.especialidad

    const buscarDoctor = await Doctores.findOne({ where: { cedula } })

    if (buscarDoctor) {
        return res.status(404).json({
            estado: 2,
            mensaje: `El usuario con cédula ${cedula}, ya existe`,
            data: [],
        })
    }

    const crearDoctor = await Doctores.create(data)

    if (crearDoctor) {
        let exito = 0

        for (let i = 0; i < especialidads.length; i++) {
            // GUARDAR DOCTOR CON ESPECIALIDAD O ESPECIALIDADES
            const dataInt = {
                idespecialidad: especialidads[i],
                iddoctor: crearDoctor.id,
            }

            const asociar = await DocEspe.create(dataInt)

            if (asociar) {
                exito++
            }
        }

        if (exito == especialidads.length) {
            return res.status(202).json({
                estado: 1,
                mensaje: "Creado con éxito",
                data: [],
            })
        }
    }
    return res.status(500).json({
        estado: 2,
        mensaje: "Error al crear el doctor",
        data: [],
    })
}

const GetDoctor = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    const existeDoctor = await Doctores.findOne({
        where: { id },
        attributes: {
            exclude: ["createdAt", "updatedAt"],
        },
    })

    return res.status(200).json({
        estado: 1,
        mensaje: "",
        data: existeDoctor,
    })
}

const PutDoctor = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)
    const { especialidad, ...data } = req.body

    const { cedula } = data

    const existeCedula = await Doctores.findOne({ where: { cedula } })

    if (!existeCedula) {
        return res.status(500).json({
            estado: 2,
            mensaje: "La cédula no existe",
            data: [],
        })
    }

    const actualizar = await Doctores.update(data, { where: { id, cedula } })

    if (actualizar) {
        const eliminarEspecilidad = await DocEspe.destroy({
            where: { iddoctor: id },
        })

        if (eliminarEspecilidad) {
            const espeInt: Array<number> = especialidad

            let exito: number = 0,
                i: number = 0

            for (i; i < espeInt.length; i++) {
                const dataInt = {
                    idespecialidad: espeInt[i],
                    iddoctor: id,
                }

                const cambiarEsp = await DocEspe.create(dataInt)

                if (cambiarEsp) {
                    exito++
                }
            }

            if (exito == espeInt.length) {
                return res.status(200).json({
                    estado: 1,
                    mensaje: "Actualizado con éxito",
                    data: [],
                })
            }

            return res.status(500).json({
                estado: 2,
                mensaje: "Error al actualizar",
                data: [],
            })
        }
        return res.status(500).json({
            estado: 2,
            mensaje: "No existe especialidad asociada",
            data: [],
        })
    }
}

const DeleteDoctor = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id)

    const eliminarDoctor = await Doctores.update(
        { estado: 0 },
        {
            where: { id },
        }
    )

    if (eliminarDoctor) {
        return res.status(200).json({
            estado: 1,
            mensaje: "Eliminado con éxito",
            data: [],
        })
    }

    return res.status(500).json({
        estado: 2,
        mensaje: "Error al eliminar el doctor",
        data: [],
    })
}

export { GetDoctores, PostDoctor, GetDoctor, PutDoctor, DeleteDoctor }
