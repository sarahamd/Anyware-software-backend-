import AppError from "./BaseError";
export class SomethingWentWrongError extends AppError {
    constructor(message = "Something went wrong") {
        super(message, 500);
    }
}
