import { IDocEsp } from "./../interfaces/IDocEspe"
import conexion from "../conexion/coneccion"
import { DataTypes } from "sequelize"

export const DocEspe = conexion.define<IDocEsp>(
    "DoctorEspecialidades",
    {
        id: {
            type: DataTypes.INTEGER.ZEROFILL,
            primaryKey: true,
            autoIncrement: true,
        },
        idespecialidad: {
            type: DataTypes.INTEGER.ZEROFILL,
            // references: {
            //     model: "Especialidades",
            //     key: "id",
            // },
        },
        iddoctor: {
            type: DataTypes.INTEGER.ZEROFILL,
            // references: {
            //     model: "Doctores",
            //     key: "id",
            // },
        },
    }
)

DocEspe.sync()
