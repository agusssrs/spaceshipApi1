import express, {Express} from 'express'
import cors from 'cors'
import authRoutes from '../routes/auth'
import {dbConnection} from '../database/config'
import ordersRoutes from '../routes/orders'
import productsRoutes from '../routes/products'

export class Server{
    app: Express
    port: string | number | undefined 
    authPath: string
    ordersPath: string
    productsPath: string

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = '/auth';
        this.ordersPath = '/orders';
        this.productsPath = '/products';

        this.conectToDB()
        this.middlewares()
        this.routes()
    }

    async conectToDB(): Promise <void>{
        await dbConnection();
    }

    middlewares(): void{
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(): void{
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.ordersPath, ordersRoutes);
        this.app.use(this.productsPath, productsRoutes);
    }

    listen(): void{
        this.app.listen(this.port, () => {
            console.log(`Corriendo en puerto ${this.port}`);
            
        });
    }
}