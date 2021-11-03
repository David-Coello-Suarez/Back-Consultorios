import { Model } from "sequelize"

export interface IPaciente extends Model {
    id?: number
    documentoIden: string
    nombres: string
    apellidos: string
    fechaNac: Date
    direccion: string
    movil: string
    fijo?: string
    correoElectronico: string
}
