import { NextFunction, Request, Response } from "express";
import {ROLS} from '../helpers/constants';

export const isAdmin = (req:Request, res:Response, next: NextFunction) => {
    const {rol} = req.body.confirmedUser

    if (rol != ROLS.admin) {
        res.status(401).json({
            msg: 'El usuario no es administrador. Por favor, intentelo nuevamente.'
        })
        return
    }

    next();
}