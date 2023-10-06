import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import Order, { IOrder } from '../models/orders'

export const getOrders = async (req: Request, res: Response) => {
    const userID: ObjectId = req.body.confirmedUser._id;

    const consulta = {user: userID};

    const orders = await Order.find(consulta)
    
    res.status(200).json({
        data: [
            ...orders
        ]
    })
}

export const createOrder = async (req: Request, res: Response) => {
    const userID: ObjectId = req.body.confirmedUser._id;
    const orderData: IOrder = req.body

    const data = {
        ...orderData,
        user: userID,
        createdAt: new Date(),
        status:"Paid"
    }

    const order = new Order(data)

    await order.save();

    res.status(201).json({
        order
    })
}