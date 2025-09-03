"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_model_1 = __importDefault(require("../models/admin.model"));
const UnauthenticatedError_1 = require("../errors/UnauthenticatedError");
const requireAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new UnauthenticatedError_1.UnauthenticatedError("You must be authenticated");
        }
        const token = authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.admin = (await admin_model_1.default.findById(decoded.id));
        if (!req.admin) {
            throw new UnauthenticatedError_1.UnauthenticatedError("You must be authenticated");
        }
        next();
    }
    catch (error) {
        console.log("requireAdmin error: ", error);
        next(error);
    }
};
exports.requireAdmin = requireAdmin;
