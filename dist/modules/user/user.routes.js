"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/admin-sign-in', user_controller_1.UserController.adminSignIn);
exports.userRouter.get('/get-dashboard-data', user_controller_1.UserController.getDashboardData);
