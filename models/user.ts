import { Model, Schema, model } from "mongoose";
import { ROLS } from "../helpers/constants";

export interface IUser {
    email: string;
    password: string;
    rol?: string;
    code?: string;
    verified?: string;
}

const UserSchema = new Schema<IUser>({
    email:{
        type:String,
        required: [true, 'Por favor, ingresá un correo electronico válido']
    },

    password:{
        type:String,
        required: [true, 'Por favor, ingresá una contraseña']
    },

    rol:{
        type: String,
        default: ROLS.user
    },

    code:{
        type: String
    },
    
    verified:{
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, password, _id, code, ...usuario} = this.toObject();
    return usuario
}

const Usuario:  Model<IUser> = model<IUser>('Usuario', UserSchema);

export default Usuario;