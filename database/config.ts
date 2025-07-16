import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> =>{
    try{
        const dbURL = process.env.DB_URL;
        if(!dbURL){
            throw new Error('La URL no fue definida correctamente dentro del archivo .env')
        }

        await mongoose.connect(dbURL)
        
    } catch (error){
        console.log(error);
        throw new Error('Ocurrió un error al iniciar la base de datos. Por favor, intentelo nuevamente.')
    }
}

