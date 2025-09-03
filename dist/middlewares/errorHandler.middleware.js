"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseError_1 = __importDefault(require("../errors/BaseError"));
const InternalServerError_1 = require("../errors/InternalServerError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof BaseError_1.default) {
        res.status(err.statusCode).json({
            message: err.message,
            success: err.success,
        });
    }
    else {
        console.log("Unexpected error: ", err);
        return res.status(500).json({ error: new InternalServerError_1.InternalServerError().message });
    }
};
exports.default = errorHandler;
