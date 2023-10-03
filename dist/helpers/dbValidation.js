"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.existeMail = void 0;
const mailer_1 = require("../mailer/mailer");
const user_1 = __importDefault(require("../models/user"));
const existeMail = async (email) => {
    const ExisteMail = await user_1.default.findOne({ email });
    if (ExisteMail && ExisteMail.verified) {
        throw new Error(`El email ${email} ya está registrado. Por favor, intente con otro email`);
    }
    if (ExisteMail && !ExisteMail.verified) {
        await (0, mailer_1.sendEmail)(email, ExisteMail.code);
        throw new Error(`El email ${email} ya está registrado. Por favor, ingresa el codigo de verificacion que enviamos a tu email.`);
    }
};
exports.existeMail = existeMail;
//# sourceMappingURL=dbValidation.js.map