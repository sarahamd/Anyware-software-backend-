"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthenticatedError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class UnauthenticatedError extends BaseError_1.default {
    constructor(message = "Authentication required") {
        super(message, 401);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
