import { Router } from "express";
import { CreateProduct, DeleteProductById, EditProductById, GetAllProducts, GetProductById } from "../controllers/ProductController";
import IsAuthenticated from "../middlewares/IsAuthenticated";
import FileUpload from "../middlewares/FileUpload";
import { CreateProductValidator, EditProductValidator } from "../validators/ProductValidator";
import { Validate } from "../middlewares/Validate";

const ProductRouter = Router();

ProductRouter.get("/products", IsAuthenticated, GetAllProducts);
ProductRouter.post("/products", IsAuthenticated, FileUpload.single('image'), CreateProductValidator, Validate, CreateProduct);
ProductRouter.get("/products/:id", IsAuthenticated, GetProductById);
ProductRouter.put("/products/:id", IsAuthenticated, FileUpload.single('image'), EditProductValidator, Validate, EditProductById);
ProductRouter.delete("/products/:id", IsAuthenticated, DeleteProductById);

export default ProductRouter;