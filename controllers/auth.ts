import { Request, Response } from "express"
import Usuario, {IUser} from '../models/user'
import bcryptjs from 'bcryptjs'
import { ROLS } from "../helpers/constants"
import randomstring from 'randomstring'
import {sendEmail} from '../mailer/mailer'
import {generateJWT} from '../helpers/generateJWT'

export const register = async (req: Request, res: Response) =>{
    const {email, password, rol}: IUser = req.body

    const usuario = new Usuario({email, password, rol});

    const salt = bcryptjs.genSaltSync(12);

    usuario.password = bcryptjs.hashSync(password, salt);

    const adminKey = req.headers["admin-key"];

    if(adminKey === process.env.KEYFORADMIN){
        usuario.rol= ROLS.admin
    }

    const newCode = randomstring.generate(8);
    
    usuario.code = newCode

    await usuario.save();

    await sendEmail(email, newCode);

    res.status(201).json({
        usuario
    })

}

export const login = async (req: Request, res: Response): Promise<void> => {
    const {email, password} : IUser = req.body;

    try{
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            res.status(404).json({
                msg:'El email no se encuntra en la base de datos.'
            });
            return
        }
        
        const validatePassword = bcryptjs.compareSync(password, usuario.password);

        if(!validatePassword){
            res.status(401).json({
                msg:'La contraseña es incorrecta'
            })
            return
        };

        const token = await generateJWT(usuario.id) 
        
        res.status(202).json({
            usuario,
            token
        })
        
    } catch (error){
        console.log(error);
        res.status(500).json({
            msg:'Ocurrió un error en el servidor'
        })
    }
}

export const verifyUser = async (req: Request, res: Response) => {
    const{email, code} = req.body

    try {
        const usuario = await Usuario.findOne({email})

        if(!usuario){
            res.status(404).json({
                msg:'El usuario no se encuntra en la base de datos.'
            });
            return
        }

        if(usuario.verified){
            res.status(400).json({
                msg:'El usuario ya fue verificado.'
            })
            return
        }

        if(code !== usuario.code){
            res.status(401).json({
                msg: 'El codigo ingresado no es válido. Por favor, intentelo nuevamente.'
            })
            return
        }

        await Usuario.findOneAndUpdate(
            {email},
            {verified:true}
        )

        res.status(200).json({
            msg:'El usuario fue verificado correctamente. Bienvenido a Spaceship Agency 👨‍🚀.'
        })

    } catch (error){
        console.log(error);
        res.status(500).json({
            msg:'Ocurrió un error en el servidor. Por favor, intentelo nuevamente.'
        })
        
    }
}