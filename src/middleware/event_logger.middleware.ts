import type { Request, Response, NextFunction } from 'express';

export class EventLogger extends Error {
    public statusCode: number;
    public message: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

function ErrorMiddleware(err: EventLogger, req: Request, res: Response, next: NextFunction) {
    try{
        let logger = { ...err }
        logger.statusCode = err.statusCode || 500;
        logger.message = err.message || "Error from Server";
        res.status(logger.statusCode).json({
            error: logger.message,
            status: logger.statusCode
        });
        console.log({
            error: logger.message,
            status: logger.statusCode
        });
    } catch (errorEventObject) {
        next(errorEventObject)
    }
};

export default ErrorMiddleware;