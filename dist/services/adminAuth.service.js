"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError_1 = require("../errors/ValidationError");
const admin_model_1 = __importDefault(require("../models/admin.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const yup = __importStar(require("yup"));
const adminSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    avatar: yup.string().optional(),
});
class adminAuthService {
    async createAdmin({ name, email, password, avatar, }) {
        try {
            await adminSchema.validate({ name, email, password, avatar });
        }
        catch (err) {
            throw new ValidationError_1.ValidationError(err.message);
        }
        const emailExists = await admin_model_1.default.findOne({ email });
        if (emailExists) {
            throw new ValidationError_1.ValidationError("Email already exists");
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const admin = await admin_model_1.default.create({
            name,
            email,
            password: hashedPassword,
            avatar,
        });
        const { password: _, ...rest } = admin?.toObject();
        return rest;
    }
    async loginAdmin({ email, password }) {
        const admin = await admin_model_1.default.findOne({ email }).lean();
        if (!admin) {
            throw new ValidationError_1.ValidationError("Invalid email or password");
        }
        const isMatch = await bcrypt_1.default.compare(password, admin.password);
        if (!isMatch) {
            throw new ValidationError_1.ValidationError("Invalid email or password");
        }
        const { password: _, ...adminWithoutPassword } = admin;
        return adminWithoutPassword;
    }
}
exports.default = new adminAuthService();
