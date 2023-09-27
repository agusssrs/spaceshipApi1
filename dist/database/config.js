"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = async () => {
    try {
        const dbURL = process.env.DB_URL;
        if (!dbURL) {
            throw new Error('La URL no fue definida correctamente dentro del archivo .env');
        }
        await mongoose_1.default.connect(dbURL);
    }
    catch (error) {
        console.log(error);
        throw new Error('Ocurrió un error al iniciar la base de datos. Por favor, intentelo nuevamente.');
    }
};
exports.dbConnection = dbConnection;
//# sourceMappingURL=config.js.map