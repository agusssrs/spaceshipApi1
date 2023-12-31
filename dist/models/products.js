"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: false
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    km: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    prePurchase: {
        type: Number,
        required: false
    },
    carImg: {
        type: String,
        required: true
    }
});
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = Product;
//# sourceMappingURL=products.js.map