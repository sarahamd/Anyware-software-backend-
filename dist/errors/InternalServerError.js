import AppError from "./BaseError";
export class InternalServerError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500, false);
    }
}
