import { Request, Response } from "express"
import {IUser} from '../models/user'

export const register = async (req: Request, res: Response) =>{
    const {email, password, rol}: IUser = req.body

    console.log(email);
    console.log(password);
    console.log(rol);
    
    
    
}