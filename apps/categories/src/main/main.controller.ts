import { Request, Response } from 'express';
import Handler from '../handlers/request.handler';

import service from './main.service';

class categoriesController {
  public async getCategories(req: Request, res: Response): Promise<void> {
    try {
      let productsService: any = '';
      let queryParams = req.query;
      productsService = await service.getCategories(queryParams);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.getCategoryById(req.params.id);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async createCategory(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.createCategory(req.body);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.updateCategory(req.params.id, req.body);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.deleteCategory(req.params.id);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }
}

export default new categoriesController();
