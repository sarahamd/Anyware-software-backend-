import AppError from "./BaseError";
export class UnauthenticatedError extends AppError {
    constructor(message = "Authentication required") {
        super(message, 401);
    }
}
