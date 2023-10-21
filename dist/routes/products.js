"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const router = (0, express_1.Router)();
router.get('/', orders_1.getOrders);
exports.default = router;
//# sourceMappingURL=products.js.map