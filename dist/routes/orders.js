"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const errorRecolector_1 = require("../middlewares/errorRecolector");
const validateVerified_1 = require("../middlewares/validateVerified");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('/', [
    validateJWT_1.default,
    errorRecolector_1.errorRecolector
], orders_1.getOrders);
router.post('/', [
    validateJWT_1.default,
    validateVerified_1.isVerified,
    (0, express_validator_1.check)("price", 'El precio es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)("prePurchase", 'El precio de reserva es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)("total", 'El precio total es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)("items", 'El array de items es obligatorio.').not().isEmpty(),
    errorRecolector_1.errorRecolector
], orders_1.createOrder);
exports.default = router;
//# sourceMappingURL=orders.js.map