"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getOrders = void 0;
const orders_1 = __importDefault(require("../models/orders"));
const getOrders = async (req, res) => {
    const userID = req.body.confirmedUser._id;
    const consulta = { user: userID };
    const orders = await orders_1.default.find(consulta);
    res.status(200).json({
        data: [
            ...orders
        ]
    });
};
exports.getOrders = getOrders;
const createOrder = async (req, res) => {
    const userID = req.body.confirmedUser._id;
    const orderData = req.body;
    const data = {
        ...orderData,
        user: userID,
        createdAt: new Date(),
        status: "In process"
    };
    const order = new orders_1.default(data);
    await order.save();
    res.status(201).json({
        order
    });
};
exports.createOrder = createOrder;
//# sourceMappingURL=orders.js.map