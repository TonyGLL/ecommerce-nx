import { Router } from 'express';
import excelController from './main.controller';

export const excelRouter = Router();

excelRouter
  .get('/download-users', excelController.downloadUsers)
  .get('/download-products', excelController.downloadProducts)
  .get('/download-categories', excelController.downloadCategories)
