import { Router } from 'express';
import productsController from './main.controller';

export const productsRouter = Router();

productsRouter
  .get('/', productsController.getProducts)
  .post('/', productsController.createProduct)
