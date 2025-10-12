import { rateLimit } from "express-rate-limit"

export const RateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        error: 'Too many requests, please try again within 15 minutes.',
    },
});