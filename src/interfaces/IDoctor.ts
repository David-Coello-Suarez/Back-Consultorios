import { Model } from "sequelize"

export interface IDoctor extends Model {
    id?: number;
    nombres: string
    apellidos: string
    fechaNac: Date
    cedula: number
    movil: number
    fijo?: number

    createdAt?: Date
    updatedAt?: Date
}
