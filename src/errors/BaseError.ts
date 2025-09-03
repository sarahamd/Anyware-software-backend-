export default class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public success: boolean;
    public error: string;

    constructor(
        message: string,
        statusCode: number,
        isOperational: boolean = true,
        success: boolean = false,
        error: string = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.success = success;
        this.error = error;

        Error.captureStackTrace(this, this.constructor);
    }
}
