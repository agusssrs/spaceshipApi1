import { Router } from "express";
import {createOrder, getOrders} from '../controllers/orders'
import validateJWT from '../middlewares/validateJWT'
import { errorRecolector } from "../middlewares/errorRecolector";
import {isVerified} from '../middlewares/validateVerified'
import { check } from "express-validator";

const router = Router();

router.get('/',
    [
        validateJWT,
        errorRecolector
    ],
    getOrders
)

router.post('/',
    [   
        validateJWT,
        isVerified,
        check("price", 'El precio es obligatorio.').not().isEmpty(),
        check("prePurchase", 'El precio de reserva es obligatorio.').not().isEmpty(),
        check("total", 'El precio total es obligatorio.').not().isEmpty(),
        check("items", 'El array de items es obligatorio.').not().isEmpty(),
        errorRecolector
    ],
    createOrder
)

export default router