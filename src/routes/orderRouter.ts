import { Router } from "express";
import { container } from "tsyringe";
import { OrderController } from "../controllers/orderController";

const orderRouter = Router();
const orderController = container.resolve(OrderController);

orderRouter.post('/create',orderController.Create.bind(orderController));

orderRouter.get('/getAll',orderController.getAll.bind(orderController));

orderRouter.get('/getById/:id',orderController.getOrderById.bind(orderController));

orderRouter.get('/OrderDetail/:id',orderController.getOrderDetail.bind(orderController));

orderRouter.put('/process/:id',orderController.Process.bind(orderController));

orderRouter.put('/cancel/:id',orderController.Cancel.bind(orderController));

orderRouter.post('/sendMail',orderController.sendMail.bind(orderController));



export default orderRouter;