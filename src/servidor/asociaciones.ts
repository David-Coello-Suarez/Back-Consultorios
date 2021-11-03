import { DocEspe, Doctores, Especialidades } from "../models"

DocEspe.hasMany(Doctores, { foreignKey: "id" })
export const esp =DocEspe.hasMany(Especialidades, { foreignKey: "id"  as 'esp'})
