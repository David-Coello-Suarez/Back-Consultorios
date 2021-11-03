import { Model } from "sequelize"

export interface IEmpresa extends Model {
    id?: number
    nombreEmpresa: string
    direccion: string
    idRepresentante: number
    estado: boolean
    logotipo: string
    icono: string
}
