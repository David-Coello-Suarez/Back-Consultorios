import { Model } from "sequelize"

export interface IDocEsp extends Model {
    id?: number
    idespecialidad: number
    iddoctor: number
    createdAt?: Date
    updatedAt?: Date
}
