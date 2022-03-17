import { Request, Response } from 'express';
import Handler from '../handlers/request.handler';

import service from './main.service';

class excelController {
  public async downloadUsers(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.downloadUsers(res);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async downloadProducts(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.downloadProducts(res);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async downloadCategories(req: Request, res: Response): Promise<void> {
    try {
      let productsService = await service.downloadCategories(res);
      Handler(res, productsService[0], productsService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }
}

export default new excelController();
