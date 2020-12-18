import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
export default function ensureAuth(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT Token is missing', 401);
    }
    const [, token] = authHeader.split(' ');
    const { secret } = authConfig.jwt;
    try {
        const decoded = verify(token, secret);
        const { sub } = decoded as ITokenPayload;
        request.user = {
            id: sub,
        };
        return next();
    } catch {
        throw new AppError('Invalid JWT token', 401);
    }
}
