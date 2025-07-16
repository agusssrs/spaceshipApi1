/*
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
*/

import mongoose from "mongoose";

export const dbConnection = async (): Promise<void> =>{
    try{
        const dbURL = process.env.DB_URL;
        if(!dbURL){
            throw new Error('La URL no fue definida correctamente dentro del archivo .env')
        }

        await mongoose.connect(process.env.MONGO_URI || '', {
  dbName: 'spaceshipDB'
})
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err.message);
});

        
    } catch (error){
        console.log(error);
        throw new Error('Ocurrió un error al iniciar la base de datos. Por favor, intentelo nuevamente.')
    }
}
