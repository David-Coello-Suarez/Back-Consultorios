import { DocEspe, Doctores, Especialidades } from "../models";

DocEspe.hasMany(Especialidades, {foreignKey: 'idespecialidad'})
// DocEspe.hasOne(Especialidades)