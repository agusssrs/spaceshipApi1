"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const constants_1 = require("../helpers/constants");
const randomstring_1 = __importDefault(require("randomstring"));
const mailer_1 = require("../mailer/mailer");
const generateJWT_1 = require("../helpers/generateJWT");
const register = async (req, res) => {
    const { email, password, rol } = req.body;
    const usuario = new user_1.default({ email, password, rol });
    const salt = bcryptjs_1.default.genSaltSync(12);
    usuario.password = bcryptjs_1.default.hashSync(password, salt);
    const adminKey = req.headers["admin-key"];
    if (adminKey === process.env.KEYFORADMIN) {
        usuario.rol = constants_1.ROLS.admin;
    }
    const newCode = randomstring_1.default.generate(8);
    usuario.code = newCode;
    await usuario.save();
    await (0, mailer_1.sendEmail)(email, newCode);
    res.status(201).json({
        usuario
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await user_1.default.findOne({ email });
        if (!usuario) {
            res.status(404).json({
                msg: 'El email no se encuntra en la base de datos.'
            });
            return;
        }
        const validatePassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validatePassword) {
            res.status(401).json({
                msg: 'La contraseña es incorrecta'
            });
            return;
        }
        ;
        const token = await (0, generateJWT_1.generateJWT)(usuario.id);
        res.status(202).json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
};
exports.login = login;
const verifyUser = async (req, res) => {
    const { email, code } = req.body;
    try {
        const usuario = await user_1.default.findOne({ email });
        if (!usuario) {
            res.status(404).json({
                msg: 'El usuario no se encuntra en la base de datos.'
            });
            return;
        }
        if (usuario.verified) {
            res.status(400).json({
                msg: 'El usuario ya fue verificado.'
            });
            return;
        }
        if (code !== usuario.code) {
            res.status(401).json({
                msg: 'El codigo ingresado no es válido. Por favor, intentelo nuevamente.'
            });
            return;
        }
        await user_1.default.findOneAndUpdate({ email }, { verified: true });
        res.status(200).json({
            msg: 'El usuario fue verificado correctamente. Bienvenido a Spaceship Agency 👨‍🚀.'
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor. Por favor, intentelo nuevamente.'
        });
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.js.map