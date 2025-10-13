import { Router } from "express";
import { SigninController, SignupController } from "../controllers/AuthController";
import { RateLimiter } from "../middlewares/RateLimiter";

const AuthRoutes = Router();

AuthRoutes.post("/sign-up", RateLimiter, SignupController);
AuthRoutes.post("/sign-in", RateLimiter, SigninController);

export default AuthRoutes;