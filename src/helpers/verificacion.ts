import { Op } from "sequelize"
import { Doctores, Especialidades, Pacientes } from "../models"

const existeEspecialidad = async (id: string = "") => {
    if (id != "") {
        const existe = await Especialidades.findOne({
            where: { id: Number(id) },
        })

        if (!existe) {
            throw new Error(`La especialidad con id: '${id}', no existe`)
        }
    } else {
        throw new Error("Debe establecer el id")
    }
}

const existeDoctor = async (id: string) => {
    if (id != "") {
        const existe = await Doctores.findOne({ where: { id } })

        if (!existe) {
            throw new Error(`El doctor con id '${id}', no existe`)
        }
    } else {
        throw new Error("Debe establecer el id")
    }
}

const validarCedula = (cedula: string = "") => {
    if (cedula != "") {
        const dni = cedula.split("").map(Number)

        if (dni.length == 10) {
            const codProvincia = Number(dni[0]) + Number(dni[1])

            if (
                codProvincia >= 1 &&
                (codProvincia <= 24 || codProvincia == 30)
            ) {
                const digitoVerificador = dni.pop()
                let total: number = 0

                dni.map((item, index) => {
                    if (index % 2 == 0) {
                        const totalInt = Number(item * 2)

                        if (totalInt > 9) {
                            total += Number(totalInt - 9)
                        } else {
                            total += Number(totalInt)
                        }
                    } else {
                        total += Number(item)
                    }
                })

                const moduloDiez: number = total % 10 ? 10 - (total % 10) : 0

                if (digitoVerificador == moduloDiez) {
                    return true
                } else {
                    throw new Error("Cédula incorrecta")
                }
            } else {
                throw new Error("No corresponde a ninguna provincia")
            }
        } else {
            throw new Error("No cumple con la longitud de cédula (10 digitos)")
        }
    } else {
        throw new Error("Debe establecer número de identificación")
    }
}

const existePacienteNuevo = async ([cedula = "", correo = ""]: [
    string,
    string
]) => {
    if (cedula != "" || correo != "") {
        const existe = await Pacientes.findOne({
            where: {
                [Op.or]: [
                    { documentoIden: cedula },
                    { correoElectronico: correo },
                ],
            },
        })

        if (existe) {
            throw new Error(
                `La cédula '${cedula}', o correo '${correo}' ya existe`
            )
        }
    } else {
        if (cedula == "") {
            throw new Error("Debe establecer el documento de identidad")
        } else {
            throw new Error("Debe establecer el correo electrónico")
        }
    }
}

const existePaciente = async (id: string) => {
    if (id != "") {
        const existe = await Pacientes.findOne({ where: { id } })

        if (!existe) {
            throw new Error(`El paciente con id '${id}', no existe`)
        }
    } else {
        throw new Error("Debe establecer el id")
    }
}

export {
    existeEspecialidad,
    existeDoctor,
    validarCedula,
    existePaciente,
    existePacienteNuevo,
}
