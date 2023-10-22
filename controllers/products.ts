import { Request, Response } from "express";
import Product from '../models/products'


export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findById(req.body.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({msg: 'Se ha producido un error.'});
    }

}

export const createProduct = async (req: Request, res: Response) => {
    const typeofProduct = new Product({
        id: req.body.id,
        brand: req.body.brand,
        model: req.body.model,
        km: req.body.km,
        year: req.body.year,
        price: req.body.price,
        prePurchase: req.body.prePurchase,
        carImg: req.body.carImg
    });
    
    try {
       const newProduct = await typeofProduct.save();
       res.status(201).json(newProduct)
    } catch (error) {
        
    }
}