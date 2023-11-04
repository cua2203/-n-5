import { Router } from 'express';
import { container } from 'tsyringe';
import { ProductController } from '../controllers/productController';


const productRouter = Router();
const productController = container.resolve(ProductController);

productRouter.get('/getAll', productController.getAll.bind(productController));
productRouter.get('/getById/:id', productController.getById.bind(productController));
productRouter.get('/delete/:id', productController.delete.bind(productController));
productRouter.post('/add', productController.add.bind(productController));
productRouter.post('/update', productController.update.bind(productController));

export default productRouter;
// /:searchString/:pageIndex/:pageSize