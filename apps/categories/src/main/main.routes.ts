import { Router } from 'express';
import categoriesController from './main.controller';

export const categoriesRouter = Router();

categoriesRouter
  .get('/', categoriesController.getCategories)
  .get('/:id', categoriesController.getCategoryById)
  .post('/', categoriesController.createCategory)
  .put('/:id', categoriesController.updateCategory)
  .delete('/:id', categoriesController.deleteCategory)
