import { Router } from "express";
import { TableSessionController } from "../controllers/table-sessions-controller";

const tablesSessionsRouter = Router();
const tableSessionController = new TableSessionController();

tablesSessionsRouter.post("/", tableSessionController.create);
tablesSessionsRouter.get("/", tableSessionController.index);
tablesSessionsRouter.patch("/:id", tableSessionController.update);

export { tablesSessionsRouter };
