"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const errorRecolector_1 = require("../middlewares/errorRecolector");
const dbValidation_1 = require("../helpers/dbValidation");
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.check)("email", 'El email es obligatorio.').isEmail(),
    (0, express_validator_1.check)("email").custom(dbValidation_1.existeMail),
    (0, express_validator_1.check)("password", 'La contraseña es obligatoria y debe contener 8 caracteres como minimo.').isLength({ min: 8 }),
    errorRecolector_1.errorRecolector
], auth_1.register);
router.post('/login', [
    (0, express_validator_1.check)("email", 'El email es obligatorio.').not().isEmpty(),
    (0, express_validator_1.check)("email", 'El email no es válido.').isEmail(),
    (0, express_validator_1.check)("password", 'La contraseña es obligatoria y debe contener 8 caracteres como minimo.').isLength({ min: 8 })
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map