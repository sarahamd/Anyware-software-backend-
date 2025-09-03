"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const UnauthenticatedError_1 = require("../errors/UnauthenticatedError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id, name, email) => {
    return jsonwebtoken_1.default.sign({ id: _id, name: name, email: email }, process.env.JWT_SECRET
    // { expiresIn: "7d" }
    );
};
exports.createToken = createToken;
const verifyToken = (token) => {
    if (!token) {
        throw new UnauthenticatedError_1.UnauthenticatedError("You must login to access");
    }
    const destructedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!destructedToken) {
        throw new UnauthenticatedError_1.UnauthenticatedError("Error with authentication");
    }
    return destructedToken;
};
exports.verifyToken = verifyToken;
