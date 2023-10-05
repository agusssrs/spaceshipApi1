import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Usuario, { IUser } from '../models/user'

const validarJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-token'] as string

    if(!token){
        res.status(401).json({
            msg: 'Por favor, ingrese un token válido en la petición.'
        });
        return
    }

    try {
        const secretpassword = process.env.SECRETPASSWORD as string;

        const payload = jwt.verify(token, secretpassword) as JwtPayload;

        const {id} = payload;

        const confirmedUser: IUser | null = await Usuario.findById(id);

        if (!confirmedUser) {
            res.status(404).json({
                msg: 'El usuario no fue encontrado en la base de datos. Por favor, intentelo nuevamente.'
            });
            return
        }

        req.body.confirmedUser = confirmedUser;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token ingreado no es válido. Por favor, ingrese un token válido en la petición.'
        });
        return
    }
}

export default validarJWT;