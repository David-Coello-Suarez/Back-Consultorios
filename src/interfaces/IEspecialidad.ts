import { Model } from "sequelize";

export interface IEspecialidad extends Model {
    id?: number
    especialidad: string
    estado: boolean
    createdAt?: Date
    updatedAt?: Date
}
