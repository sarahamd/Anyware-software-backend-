"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode, isOperational = true, success = false, error = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.success = success;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
