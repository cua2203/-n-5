import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '../controllers/userController';
const userRouter = Router();
const userController = container.resolve(UserController);
userRouter.post('/login', userController.authenticate.bind(userController));
userRouter.post('/register', userController.register.bind(userController));
userRouter.get('/getAll', userController.getAll.bind(userController));
userRouter.put('/hide', userController.Hide.bind(userController));

export default userRouter;