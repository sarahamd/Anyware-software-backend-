"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class UnauthorizedError extends BaseError_1.default {
    constructor(message = "You are not authorized to perform this action") {
        super(message, 403);
    }
}
exports.UnauthorizedError = UnauthorizedError;
