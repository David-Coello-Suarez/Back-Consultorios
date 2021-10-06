import { literal, DataTypes } from "sequelize"
import conexion from "../conexion/coneccion"
import { IDoctor } from "../interfaces"

export const Doctores = conexion.define<IDoctor>("Doctores", {
    id: {
        type: DataTypes.INTEGER.ZEROFILL,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    apellidos: DataTypes.STRING,
    cedula: DataTypes.TEXT,
    movil: DataTypes.TEXT,
    fijo: DataTypes.TEXT,
    idempresa: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
})

Doctores.sync()
