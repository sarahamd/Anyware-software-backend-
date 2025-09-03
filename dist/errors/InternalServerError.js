"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class InternalServerError extends BaseError_1.default {
    constructor(message = "Internal server error") {
        super(message, 500, false);
    }
}
exports.InternalServerError = InternalServerError;
