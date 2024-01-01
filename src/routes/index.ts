import { Router } from 'express';
import 'reflect-metadata';
import categoryRouter from './categoryRouter';
import brandRouter from './brandRouter';
import userRouter from './userRouter';
import productRouter from './productRouter';
import { authenticate,authorization } from '../middlewares/authMiddleware';
import variantRouter from './variantRouter';
import orderRouter from './orderRouter';
import Uploadrouter from './uploadRouter';
import importRouter from './importRouter';

const router = Router();

router.use('/category',authenticate,authorization(["Admin","User"]), categoryRouter);
router.use('/brand',authenticate,authorization(["Admin","User"]), brandRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/variant', variantRouter);
router.use('/order', orderRouter);
router.use('/import', importRouter);
router.use('/upload', Uploadrouter);

export default router;
