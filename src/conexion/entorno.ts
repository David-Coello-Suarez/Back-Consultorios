import * as dotenv from "dotenv"
import { Dialect } from "sequelize/types"

dotenv.config()

export const uriservidor = process.env.SERVIDOR
export const diactelo = <Dialect>process.env.DIALECTO
