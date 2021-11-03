import { DataTypes, literal } from "sequelize"
import conexion from "../conexion/coneccion"
import { IPaciente } from "../interfaces"

export const Pacientes = conexion.define<IPaciente>("Paciente", {
    id: {
        type: DataTypes.INTEGER.ZEROFILL,
        primaryKey: true,
        autoIncrement: true,
    },
    documentoIden: {
        type: DataTypes.STRING(15),
        unique: true,
        allowNull: false,
    },
    nombres: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    fechaNac: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    direcion: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    movil: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    fijo: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    correoElectronico: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal("CURRENT_TIMESTAMP"),
    },
})

Pacientes.sync()