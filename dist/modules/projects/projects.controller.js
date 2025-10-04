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
exports.ProjectController = void 0;
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
const createProject = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, thumbnailUrl, features, liveUrl, projectUrl } = req.body;
    if (!name || !description || !features || !Array.isArray(features) || features.length === 0 || !liveUrl || !projectUrl) {
        (0, sendResponse_1.sendResponse)(res, {
            data: null,
            message: 'Required post field(s) missing or invalid',
            statusCode: 400,
        });
        return;
    }
    try {
        const project = yield prisma_1.default.projects.create({
            data: {
                name: String(name),
                description: String(description),
                features: features.map((item) => String(item)),
                thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
                liveUrl: String(liveUrl),
                projectUrl: String(projectUrl),
            },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Project created successfully!',
            data: project,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const getProjectById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const project = yield prisma_1.default.projects.findUnique({
            where: { id },
        });
        if (!project) {
            (0, sendResponse_1.sendResponse)(res, {
                data: null,
                message: 'Project not found',
                statusCode: 404,
            });
            return;
        }
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Project fetched successfully!',
            data: project,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const getAllProjects = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma_1.default.projects.findMany({
            orderBy: { id: 'desc' },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'All projects fetched successfully!',
            data: projects,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const deleteProjectById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const deletedProject = yield prisma_1.default.projects.delete({
            where: { id },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Project deleted successfully!',
            data: deletedProject,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
const modifyProjectById = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, thumbnailUrl, features, liveUrl, projectUrl } = req.body;
    const id = Number(req.params.id);
    if (!name || !description || !features || !Array.isArray(features) || features.length === 0 || !liveUrl || !projectUrl) {
        (0, sendResponse_1.sendResponse)(res, {
            data: null,
            message: 'Required post field(s) missing or invalid',
            statusCode: 400,
        });
        return;
    }
    try {
        const updatedProject = yield prisma_1.default.projects.update({
            where: { id },
            data: {
                name: String(name),
                description: String(description),
                features: features.map((item) => String(item)),
                thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
                liveUrl: String(liveUrl),
                projectUrl: String(projectUrl),
            },
        });
        (0, sendResponse_1.sendResponse)(res, {
            message: 'Project updated successfully!',
            data: updatedProject,
            statusCode: 200,
        });
    }
    catch (error) {
        handleServerError(res, error);
    }
}));
exports.ProjectController = {
    createProject,
    getAllProjects,
    getProjectById,
    modifyProjectById,
    deleteProjectById,
};
