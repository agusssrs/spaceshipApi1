"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const register = async (req, res) => {
    const { email, password, rol } = req.body;
    console.log(email);
    console.log(password);
    console.log(rol);
};
exports.register = register;
//# sourceMappingURL=auth.js.map