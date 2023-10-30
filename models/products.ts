import { Model, Schema, Types, model } from "mongoose";

export interface IProduct {
    id: Number;
    brand: String;
    model: String;
    km: String;
    year: Number;
    price: Number;
    prePurchase: Number;
    carImg: String;
}

const ProductSchema = new Schema <IProduct>({
    id:{
        type: Number,
        required: true
    },

    brand:{
        type: String,
        required: true
    },

    model:{
        type: String,
        required: true
    },

    km:{
        type: String,
        required: true
    },

    year:{
        type: Number,
        required: false
    },

    price:{
        type: Number,
        required: true
    },

    prePurchase:{
        type: Number,
        required: false
    },

    carImg:{
        type: String,
        required: true
    }
});

const Product: Model<IProduct> = model<IProduct>('Product', ProductSchema);

export default Product;