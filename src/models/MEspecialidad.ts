import { literal, DataTypes } from "sequelize"
import conexion from "../conexion/coneccion"
import { IEspecialidad } from "../interfaces"

export const Especialidades = conexion.define<IEspecialidad>("Especialidades", {
    id: {
        type: DataTypes.INTEGER.ZEROFILL,
        primaryKey: true,
        // defaultValue: 1,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "El nombre es requerido" },
        },
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal("CURRENT_TIMESTAMP"),
    },
}, {
    freezeTableName: true,
  })

Especialidades.sync()
