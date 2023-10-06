import { Model, Schema, Types, model } from "mongoose";

interface IItems{
    id: Number;
    brand: String;
    model: String;
    km: String;
    year: Number;
    price: Number;
    prePurchase: Number;
    carImg: String;
}

export interface IOrder {
    createdAt: Date;
    user: Types.ObjectId;
    price: Number;
    prePurchase: Number;
    items: IItems[];
    status: String;
    total: Number;
}

const OrderSchema = new Schema<IOrder>({
    createdAt:{
        type: Date,
        default: Date.now
    },

    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },

    price:{
        type: Number,
        required:true
    },

    prePurchase:{
        type: Number,
        required:true
    },

    items:{
        type:[{
            id:{
                type:Number,
                required:true,
            },

            brand:{
                type:String,
                required:true
            },

            model:{
                type:String,
                required:true
            },

            km:{
                type:String,
                required:true
            },

            year:{
                type:String,
                required:true
            },

            price:{
                type:Number,
                required:true
            },

            prePurchase:{
                type:Number,
                required:true
            },

            carImg:{
                type:String,
                required:true
            },    
        }],
        required:true
    },

    status:{
        type: String,
        required:true
    },

    total:{
        type:Number,
        required:true
    }
});

const Order: Model<IOrder> = model<IOrder>('Order', OrderSchema);

export default Order;