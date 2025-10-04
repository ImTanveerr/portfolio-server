"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // use env in prod
// --- LOGIN ---
const adminSignIn = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 401,
            message: 'Credentials incomplete',
            data: null,
        });
    }
    const existingUser = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    if (!existingUser) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 401,
            message: 'Invalid email',
            data: null,
        });
    }
    const isPasswordCorrect = yield (0, bcryptjs_1.compare)(password, existingUser.password);
    if (!isPasswordCorrect) {
        return (0, sendResponse_1.sendResponse)(res, {
            statusCode: 400,
            message: 'Invalid password',
            data: null,
        });
    }
    // generate tokens
    const accessToken = jsonwebtoken_1.default.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ id: existingUser.id, email: existingUser.email }, JWT_SECRET, { expiresIn: '7d' });
    // remove password before sending
    const { password: _ } = existingUser, userWithoutPassword = __rest(existingUser, ["password"]);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        message: 'User validation successful!',
        data: {
            user: userWithoutPassword,
            accessToken,
            refreshToken,
        },
    });
}));
// --- DASHBOARD ---
const getDashboardData = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const [postData, projectData] = yield prisma_1.default.$transaction([
        prisma_1.default.posts.findMany({
            omit: { content: true, updatedAt: true },
            orderBy: { createdAt: 'desc' },
        }),
        prisma_1.default.projects.findMany({
            select: { id: true, name: true, description: true },
            orderBy: { id: 'desc' },
        }),
    ]);
    (0, sendResponse_1.sendResponse)(res, {
        data: { postData, projectData },
        message: 'Dashboard Data Fetched Successfully!',
        statusCode: 200,
    });
}));
exports.UserController = {
    adminSignIn,
    getDashboardData,
};
