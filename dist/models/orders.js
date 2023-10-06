"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    prePurchase: {
        type: Number,
        required: true
    },
    items: {
        type: [{
                id: {
                    type: Number,
                    required: true,
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
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                prePurchase: {
                    type: Number,
                    required: true
                },
                carImg: {
                    type: String,
                    required: true
                },
            }],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});
const Order = (0, mongoose_1.model)('Order', OrderSchema);
exports.default = Order;
//# sourceMappingURL=orders.js.map