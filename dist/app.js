"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const error_middleware_1 = require("./middleware/error.middleware");
const notfound_middleware_1 = require("./middleware/notfound.middleware");
const router_1 = require("./router");
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => res.send('Portfolio backend running!'));
exports.app.use('/api', router_1.globalRouter);
exports.app.use(error_middleware_1.globalErrorHandler);
exports.app.use(notfound_middleware_1.notFound);
