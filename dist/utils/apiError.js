"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message, errorDetails) {
        super(message);
        this.errorDetails = errorDetails;
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : 500;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
