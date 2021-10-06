import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

export const errores = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(500).json({
            estado: 2,
            msg: `Errores encontrados`,
            data: errors,
        })
    }

    next()
}
