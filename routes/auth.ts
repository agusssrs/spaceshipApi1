import { Router } from "express";
import {login, register, verifyUser} from '../controllers/auth'
import { check } from "express-validator";
import {errorRecolector} from '../middlewares/errorRecolector';
import {existeMail} from '../helpers/dbValidation'

const router = Router()

router.post(
    "/register",
    [
        check("email", 'El email es obligatorio.').isEmail(),
        check("email").custom(existeMail),
        check("password", 'La contraseña es obligatoria y debe contener 8 caracteres como minimo.').isLength({min:8}),
        errorRecolector
    ],
    register
);

router.post(
    '/login',
    [
        check("email", 'El email es obligatorio.').not().isEmpty(), 
        check("email", 'El email no es válido.').isEmail(),
        check("password", 'La contraseña es obligatoria y debe contener 8 caracteres como minimo.').isLength({min:8}),
        errorRecolector
    ],
    login
);

router.patch(
    '/verify',
    [
        check("email", 'El email es obligatorio.').not().isEmpty(), 
        check("email", 'El email no es válido.').isEmail(),
        check("code").not().isEmpty(),
        errorRecolector
    ],
    verifyUser
)

export default router