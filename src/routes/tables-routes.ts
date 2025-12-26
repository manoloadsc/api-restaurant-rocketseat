import { Router } from "express";
import { TableController } from "../controllers/table-controller";

const tablesRouter = Router();
const tablesController = new TableController();

tablesRouter.get("/", tablesController.index);

export { tablesRouter };
