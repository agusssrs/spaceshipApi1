"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const validarJWT = async (req, res, next) => {
    const token = req.headers['x-token'];
    if (!token) {
        res.status(401).json({
            msg: 'Por favor, ingrese un token válido en la petición.'
        });
        return;
    }
    try {
        const secretpassword = process.env.SECRETPASSWORD;
        const payload = jsonwebtoken_1.default.verify(token, secretpassword);
        const { id } = payload;
        const confirmedUser = await user_1.default.findById(id);
        if (!confirmedUser) {
            res.status(404).json({
                msg: 'El usuario no fue encontrado en la base de datos. Por favor, intentelo nuevamente.'
            });
            return;
        }
        req.body.confirmedUser = confirmedUser;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'El token ingreado no es válido. Por favor, ingrese un token válido en la petición.'
        });
        return;
    }
};
exports.default = validarJWT;
//# sourceMappingURL=validateJWT.js.map