import AppError from "./BaseError";
export class NotFoundError extends AppError {
    constructor(message = "Not Found") {
        super(message, 404);
    }
}
