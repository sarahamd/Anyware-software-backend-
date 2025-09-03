import { Response } from "express";

export const sendSuccess = <T = any>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        ...(data !== undefined && { data }),
    });
};
