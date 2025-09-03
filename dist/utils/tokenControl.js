import { UnauthenticatedError } from "../errors/UnauthenticatedError";
import jwt from "jsonwebtoken";
const createToken = (_id, name, email) => {
    return jwt.sign({ id: _id, name: name, email: email }, process.env.JWT_SECRET
    // { expiresIn: "7d" }
    );
};
const verifyToken = (token) => {
    if (!token) {
        throw new UnauthenticatedError("You must login to access");
    }
    const destructedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!destructedToken) {
        throw new UnauthenticatedError("Error with authentication");
    }
    return destructedToken;
};
export { createToken, verifyToken };
