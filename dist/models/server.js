"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("../routes/auth"));
const config_1 = require("../database/config");
const orders_1 = __importDefault(require("../routes/orders"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT;
        this.authPath = '/auth';
        this.ordersPath = '/orders';
        this.conectToDB();
        this.middlewares();
        this.routes();
    }
    async conectToDB() {
        await (0, config_1.dbConnection)();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(this.authPath, auth_1.default);
        this.app.use(this.ordersPath, orders_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Corriendo en puerto ${this.port}`);
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map