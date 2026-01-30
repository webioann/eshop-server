// src/middleware/error.middleware.ts
import type { Request, Response, NextFunction } from 'express';

export class CustomErrorHandler extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

function ErrorMiddleware(err: CustomErrorHandler, req: Request, res: Response, next: NextFunction) {
    try{
        let error = { ...err }
        error.statusCode = err.statusCode || 500;
        error.message = err.message || "Error from Server";
        res.status(error.statusCode).json({
            success: false,
            error: error.message,
            status: error.statusCode
        });
        console.log({
            success: false,
            error: error.message,
            status: error.statusCode
        });
    } catch (errorEventObject) {
        next(errorEventObject)
    }
};

export default ErrorMiddleware;