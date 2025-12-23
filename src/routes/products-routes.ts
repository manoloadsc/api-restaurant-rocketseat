import { Router } from "express";
import ProductController from "../controllers/products-controller";

const productsRoutes = Router();
const productController = new ProductController();

productsRoutes.get("/", productController.index);

export { productsRoutes };
