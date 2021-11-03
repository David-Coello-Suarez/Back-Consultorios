import conexion from "../conexion/coneccion"
import { IEmpresa } from "../interfaces/IEmpresa"
import { DataTypes } from "sequelize"
import { literal } from "sequelize"

export const Empresa = conexion.define<IEmpresa>("Empresa", {
    id: {
        type: DataTypes.INTEGER.ZEROFILL,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreEmpresa: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El nombre es requerido",
            },
        },
    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: "La dirección es requerida",
            },
        },
    },
    idRepresentante: {
        type: DataTypes.INTEGER.ZEROFILL,
        defaultValue: 1,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
    },
    logotipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El logo es requerido",
            },
        },
    },
    icono: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            notNull: {
                msg: "El icono es requerido",
            },
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal("CURRENT_TIMESTAMP"),
    },
})

Empresa.sync()
