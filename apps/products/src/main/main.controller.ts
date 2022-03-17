import { Request, Response } from 'express';
import Handler from '../handlers/request.handler';

import service from './main.service';

class productsController {
  public async getProducts(req: Request, res: Response): Promise<void> {
    try {
      let productsService: any = '';
      let queryParams = req.query;
      productsService = await service.getProducts(queryParams);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async createProduct(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.createProduct(req.body);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }
}

export default new productsController();
