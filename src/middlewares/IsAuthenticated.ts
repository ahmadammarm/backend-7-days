import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                name: string;
                email: string;
            }
        }
    }
}

const IsAuthenticated = (request: Request, response: Response, next: NextFunction) => {

    try {
        const authorization = request.headers.authorization
            ? request.headers.authorization.split(' ')
            : null;

        if (
            !authorization ||
            authorization.length !== 2 ||
            authorization[0] !== 'Bearer'
        ) {
            response.status(401).json({
                code: 401,
                success: false,
                message: 'Unauthorized: Invalid or missing authorization header',
            });
            return;
        }

        const token = authorization.length > 1 ? authorization[1] : null;

        if (token) {
            const payload = jwt.verify(token, process.env.JWT_SECRET as string);
            if (payload && typeof payload === 'object' && 'user' in payload) {
                request.user = {
                    id: payload.user.id,
                    name: payload.user.name,
                    email: payload.user.email,
                };
                next();
            } else {
                response.status(401).json({
                    code: 401,
                    success: false,
                    message: 'Unauthorized: Invalid token',
                });
            }
        } else {
            response.status(401).json({
                code: 401,
                success: false,
                message: 'Unauthorized: Token is required',
            });
        }
    } catch (error) {
        next(error);
    }
};

export default IsAuthenticated;
