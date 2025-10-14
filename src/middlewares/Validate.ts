import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const Validate = (request: Request, response: Response, next: NextFunction): void => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        const mappedErrors: Record<string, string> = {};

        for (const error of errors.array()) {
            // @ts-ignore
            mappedErrors[error.param] = error.msg;
        }

        response.status(400).json({
            code: 400,
            success: false,
            message: "Validation failed",
            errors: mappedErrors,
        });
        return;
    }

    next();
};
