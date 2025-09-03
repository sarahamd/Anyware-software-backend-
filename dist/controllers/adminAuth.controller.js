import jwt from "jsonwebtoken";
import { createToken } from "../utils/tokenControl";
import adminAuthService from "../services/adminAuth.service";
import { ValidationError } from "../errors/ValidationError";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";
import adminModel from "../models/admin.model";
export const registerAdmin = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body;
        if (!name || !email || !password || !avatar) {
            throw new ValidationError("All fields must be filled");
        }
        const admin = await adminAuthService.createAdmin({
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
export const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ValidationError("Email and Password are required");
        }
        const admin = await adminAuthService.loginAdmin({ email, password });
        const token = createToken(admin._id, admin.name, admin.email);
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
export const getCurrentAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new UnauthenticatedError("You must be authenticated");
        }
        const token = authorization.split(" ")[1];
        if (!token) {
            throw new UnauthenticatedError("You must be authenticated");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = (await adminModel
            .findById(decoded.id)
            .select(["-password"]));
        if (!admin) {
            throw new UnauthenticatedError("You must be authenticated");
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
