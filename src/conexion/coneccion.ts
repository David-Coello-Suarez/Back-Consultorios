import { Sequelize } from "sequelize"
import { diactelo, uriservidor } from "./entorno"

const conexion: Sequelize = new Sequelize(`${uriservidor}`, {
    dialect: `${diactelo}`,
    logging: false,
    // query: {
    //     raw: true,
    // },
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },
    timezone: "-05:00",
})

export default conexion
