import { Router } from 'express';
import { container } from 'tsyringe';
import { VariantController } from '../controllers/variantController';


const variantRouter = Router();
const variantController = container.resolve(VariantController);

variantRouter.get('/getAll', variantController.getAll.bind(variantController));
variantRouter.get('/getAllPaging', variantController.getAllPaging.bind(variantController));
variantRouter.get('/getById/:id', variantController.getById.bind(variantController));
variantRouter.get('/getByLaptopId/:id', variantController.getByLaptopId.bind(variantController));
variantRouter.delete('/delete/:id', variantController.delete.bind(variantController));
variantRouter.post('/add', variantController.add.bind(variantController));
variantRouter.put('/update', variantController.update.bind(variantController));

export default variantRouter;
