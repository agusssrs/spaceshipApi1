import { Router } from "express";
import {getOrders} from '../controllers/orders'
import validateJWT from '../middlewares/validateJWT'
import { errorRecolector } from "../middlewares/errorRecolector";
const router = Router();

router.get('/',
    [
        validateJWT,
        errorRecolector
    ]
,getOrders)

export default router