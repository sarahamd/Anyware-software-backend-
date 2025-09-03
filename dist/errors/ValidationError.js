"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class ValidationError extends BaseError_1.default {
    constructor(message = "Validation failed") {
        super(message, 400);
    }
}
exports.ValidationError = ValidationError;
