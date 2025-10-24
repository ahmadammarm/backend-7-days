import { Router } from "express";
import IsAuthenticated from "../middlewares/IsAuthenticated";
import { GeminiResult } from "../controllers/GeminiController";

const GeminiRoute = Router();

GeminiRoute.post("/gemini/result", IsAuthenticated, GeminiResult);

export default GeminiRoute;