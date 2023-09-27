"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../helpers/constants");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Por favor, ingresá un correo electronico válido']
    },
    password: {
        type: String,
        required: [true, 'Por favor, ingresá una contraseña']
    },
    rol: {
        type: String,
        default: constants_1.ROLS.user
    },
    code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, code, ...usuario } = this.toObject();
    return usuario;
};
const Usuario = (mongoose_1.Model) = (0, mongoose_1.model)('Usuario', UserSchema);
exports.default = Usuario;
//# sourceMappingURL=user.js.map