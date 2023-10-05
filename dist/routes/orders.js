"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const errorRecolector_1 = require("../middlewares/errorRecolector");
const router = (0, express_1.Router)();
router.get('/', [
    validateJWT_1.default,
    errorRecolector_1.errorRecolector
], orders_1.getOrders);
exports.default = router;
//# sourceMappingURL=orders.js.map