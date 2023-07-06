require('dotenv').config();
import { NextFunction, Request, Response } from 'express';
import AppError from './appError';
import cors from 'cors';
import config from 'config';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { Fail } from './response-parser';

export async function healthCheck(app: any) {
    // HEALTH CHECKER
    app.get('/api/healthChecker', async (_, res: Response) => {
        // const message = await redisClient.get('try');

        res.status(200).json({
            status: 'success',
            message: 'Welcome to Node.js, we are happy to see you',
        });
    });
}

export async function handleGlobalErrors(app: any) {
    // UNHANDLED ROUTE
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new AppError(404, `Route ${req.originalUrl} not found`));
    });

    // GLOBAL ERROR HANDLER
    app.use(
        (error: AppError, req: Request, res: Response, next: NextFunction) => {
            error.status = error.status || 'error';
            error.statusCode = error.statusCode || 500;
            
            Fail({res, statusCode: error.statusCode, message: error.message})
        }
    );
}

export async function useCors(app: any) {
    app.use(
        cors({
            origin: config.get<string>('origin'),
            credentials: true,
        })
    );
}

export async function useCookies(app: any) {
    app.use(cookieParser());
}

export async function useLogger(app: any) {
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
}