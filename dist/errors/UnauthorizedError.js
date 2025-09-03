import AppError from "./BaseError";
export class UnauthorizedError extends AppError {
    constructor(message = "You are not authorized to perform this action") {
        super(message, 403);
    }
}
