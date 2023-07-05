import { Response } from 'express';

export function Success({ statusCode = 200, res, message }: { res: Response, message: string, statusCode?: number }) {
    return res.status(statusCode).json({
        status: 'success',
        message,
    });
}

export function Fail({ statusCode = 500, res, message }: { res: Response, message: string, statusCode?: number }) {
    return res.status(statusCode).json({
        status: 'fail',
        message,
    });
}
