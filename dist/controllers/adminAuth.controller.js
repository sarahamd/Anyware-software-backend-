"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentAdmin = exports.loginAdmin = exports.registerAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenControl_1 = require("../utils/tokenControl");
const adminAuth_service_1 = __importDefault(require("../services/adminAuth.service"));
const ValidationError_1 = require("../errors/ValidationError");
const UnauthenticatedError_1 = require("../errors/UnauthenticatedError");
const admin_model_1 = __importDefault(require("../models/admin.model"));
const registerAdmin = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;
        if (!name || !email || !password || !avatar) {
            throw new ValidationError_1.ValidationError("All fields must be filled");
        }
        const admin = await adminAuth_service_1.default.createAdmin({
            name,
            email,
            password,
            avatar,
        });
        res.status(200).json({
            success: true,
            message: "Admin registered successfully",
            admin,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.registerAdmin = registerAdmin;
const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ValidationError_1.ValidationError("Email and Password are required");
        }
        const admin = await adminAuth_service_1.default.loginAdmin({ email, password });
        const token = (0, tokenControl_1.createToken)(admin._id, admin.name, admin.email);
        res.status(200).json({
            success: true,
            message: "Admin logged in successfully",
            admin,
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginAdmin = loginAdmin;
const getCurrentAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new UnauthenticatedError_1.UnauthenticatedError("You must be authenticated");
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            throw new UnauthenticatedError_1.UnauthenticatedError("You must be authenticated");
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const admin = (await admin_model_1.default
            .findById(decoded.id)
            .select(["-password"]));
        if (!admin) {
            throw new UnauthenticatedError_1.UnauthenticatedError("You must be authenticated");
        }
        res.status(200).json({
            success: true,
            message: "admin authenticated",
            admin,
        });
    }
    catch (error) {
        console.log("requireAdmin error: ", error);
        next(error);
    }
};
exports.getCurrentAdmin = getCurrentAdmin;
