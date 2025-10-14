import { Router } from "express";
import { SigninController, SignupController } from "../controllers/AuthController";
import { RateLimiter } from "../middlewares/RateLimiter";
import { SigninValidator, SignupValidator } from "../validators/AuthValidator";
import { Validate } from "../middlewares/Validate";

const AuthRoutes = Router();

AuthRoutes.post("/sign-up", RateLimiter, SignupValidator, Validate, SignupController);
AuthRoutes.post("/sign-in", RateLimiter, SigninValidator, Validate, SigninController);

export default AuthRoutes;