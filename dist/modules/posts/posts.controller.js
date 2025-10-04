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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = require("../../utils/sendResponse");
const prisma_1 = __importDefault(require("../../lib/prisma"));
// Helper for server errors
const handleServerError = (res, error) => {
    console.error(error);
    (0, sendResponse_1.sendResponse)(res, {
        data: null,
        message: 'Something went wrong on the server',
        statusCode: 500,
    });
};
const createPost = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, thumbnailUrl, content } = req.body;
    if (!title || !description || !content) {
        (0, sendResponse_1.sendResponse)(res, {
            data: null,
            message: 'Required post field(s) missing',
            statusCode: 400,
        });
        return;
    }
    try {
        const post = yield prisma_1.default.posts.create({
            data: {
                title: String(title),
                description: String(description),
                content: String(content),
                thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
            },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Post created successfully!',
            data: post,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const getPostById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const post = yield prisma_1.default.posts.findUnique({
            where: { id },
        });
        if (!post) {
            (0, sendResponse_1.sendResponse)(res, {
                data: null,
                message: 'Post not found',
                statusCode: 404,
            });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Post fetched successfully!',
            data: post,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const getAllPosts = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield prisma_1.default.posts.findMany({
            orderBy: { createdAt: 'desc' },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'All posts fetched successfully!',
            data: posts,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const deletePostById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deletedPost = yield prisma_1.default.posts.delete({
            where: { id },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Post deleted successfully!',
            data: deletedPost,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const modifyPostById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, thumbnailUrl, content } = req.body;
    const id = Number(req.params.id);
    if (!title || !description || !content) {
        (0, sendResponse_1.sendResponse)(res, {
            data: null,
            message: 'Required post field(s) missing',
            statusCode: 400,
        });
        return;
    }
    try {
        const updatedPost = yield prisma_1.default.posts.update({
            where: { id },
            data: {
                title: String(title),
                description: String(description),
                content: String(content),
                thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
            },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Post updated successfully!',
            data: updatedPost,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
exports.PostController = {
    createPost,
    getPostById,
    getAllPosts,
    modifyPostById,
    deletePostById,
};
