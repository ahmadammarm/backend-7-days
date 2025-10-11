import { Router } from "express";
import { CreateProduct, DeleteProductById, EditProductById, GetAllProducts, GetProductById } from "../controllers/ProductController";
import IsAuthenticated from "../middlewares/IsAuthenticated";

const ProductRouter = Router();

ProductRouter.get("/products", IsAuthenticated, GetAllProducts);
ProductRouter.post("/products", IsAuthenticated, CreateProduct);
ProductRouter.get("/products/:id", IsAuthenticated, GetProductById);
ProductRouter.put("/products/:id", IsAuthenticated, EditProductById);
ProductRouter.delete("/products/:id", IsAuthenticated, DeleteProductById);

export default ProductRouter;