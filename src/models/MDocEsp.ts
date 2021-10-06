import { IDocEsp } from "./../interfaces/IDocEspe"
import conexion from "../conexion/coneccion"
import { DataTypes } from "sequelize"

export const DocEspe = conexion.define<IDocEsp>("DoctorEspecialidade", {
    id: {
        type: DataTypes.INTEGER.ZEROFILL,
        primaryKey: true,
        autoIncrement: true,
    },
    idespecialidad: DataTypes.INTEGER,
    iddoctor: DataTypes.INTEGER,
})

DocEspe.sync()
