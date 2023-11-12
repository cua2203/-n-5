import { Router } from 'express';
import { container } from 'tsyringe';
import { CategoryController } from '../controllers/categoryController';


const categoryRouter = Router();
const categoryController = container.resolve(CategoryController);

categoryRouter.get('/getAll', categoryController.getAll.bind(categoryController));
categoryRouter.get('/getById/:id', categoryController.getById.bind(categoryController));
categoryRouter.delete('/delete/:id', categoryController.delete.bind(categoryController));
categoryRouter.post('/add', categoryController.add.bind(categoryController));
categoryRouter.post('/update', categoryController.update.bind(categoryController));

export default categoryRouter;
