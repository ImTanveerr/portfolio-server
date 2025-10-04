"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = globalErrorHandler;
const apiError_1 = require("../utils/apiError");
function globalErrorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    let errorDetails = undefined;
    // Fallback to ApiError
    if (err instanceof apiError_1.ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    res.status(statusCode).json(Object.assign(Object.assign({ statusCode,
        message, errorName: err.name }, (errorDetails && { errors: errorDetails })), (process.env.NODE_ENV === 'development' && { stack: err.stack })));
}
