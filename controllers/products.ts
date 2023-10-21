import { Request, Response } from "express";
import Product from '../models/products'


export const getProducts = async (req: Request, res: Response) => {
    

    res.status(201).json({
        Product:[]
    })
}