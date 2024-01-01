import { Router } from "express";
import { container } from "tsyringe";

import { ImportBillController } from "../controllers/importBillController";

const importRouter = Router();
const orderController = container.resolve(ImportBillController);

importRouter.post('/create',orderController.Create.bind(orderController));



export default importRouter;