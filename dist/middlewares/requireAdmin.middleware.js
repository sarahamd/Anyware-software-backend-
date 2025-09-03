import jwt from "jsonwebtoken";
import adminModel from "../models/admin.model";
import { UnauthenticatedError } from "../errors/UnauthenticatedError";
const requireAdmin = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new UnauthenticatedError("You must be authenticated");
        }
        const token = authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = (await adminModel.findById(decoded.id));
        if (!req.admin) {
            throw new UnauthenticatedError("You must be authenticated");
        }
        next();
    }
    catch (error) {
        console.log("requireAdmin error: ", error);
        next(error);
    }
};
export { requireAdmin };
