"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
function sendResponse(res, { statusCode, message, data, }) {
    res.status(statusCode).json({
        message,
        statusCode,
        data,
    });
}
