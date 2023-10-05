import { Request, Response } from "express";
// import confirmedUser from '../middlewares/validateJWT'

export const getOrders = (req: Request, res: Response) => {
    console.log(req.body.confirmedUser);
    
    
}