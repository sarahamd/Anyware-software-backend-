"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomethingWentWrongError = void 0;
const BaseError_1 = __importDefault(require("./BaseError"));
class SomethingWentWrongError extends BaseError_1.default {
    constructor(message = "Something went wrong") {
        super(message, 500);
    }
}
exports.SomethingWentWrongError = SomethingWentWrongError;
