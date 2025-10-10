import { Router } from "express";
import { GetAllProducts } from "../controllers/ProductController";
import IsAuthenticated from "../middlewares/IsAuthenticated";

const ProductRouter = Router();

ProductRouter.get("/products", IsAuthenticated, GetAllProducts);

export default ProductRouter;