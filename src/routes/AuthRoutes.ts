import { Router } from "express";
import { SigninController, SignupController } from "../controllers/AuthController";

const AuthRoutes = Router();

AuthRoutes.post("/sign-up", SignupController);
AuthRoutes.post("/sign-in", SigninController);

export default AuthRoutes;