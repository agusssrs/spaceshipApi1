"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProducts = void 0;
const products_1 = __importDefault(require("../models/products"));
const getProducts = async (req, res) => {
    try {
        const products = await products_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ msg: 'Se ha producido un error.' });
    }
};
exports.getProducts = getProducts;
const createProduct = async (req, res) => {
    const typeofProduct = new products_1.default({
        id: req.body.id,
        brand: req.body.brand,
        model: req.body.model,
        km: req.body.km,
        year: req.body.year,
        price: req.body.price,
        prePurchase: req.body.prePurchase,
        carImg: req.body.carImg
    });
    try {
        const newProduct = await typeofProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
    }
};
exports.createProduct = createProduct;
//# sourceMappingURL=products.js.map