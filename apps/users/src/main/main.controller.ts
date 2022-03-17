import { Request, Response } from 'express';
import Handler from '../handlers/request.handler';
import { IUser } from './main.model';

import service from './main.service';

class usersController {
  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      let usersService: any = '';
      const queryParams = req.query;
      usersService = await service.getUsers(queryParams);
      Handler(res, usersService[0], usersService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      let usersService: any = '';
      const id: string = req.params.id;
      usersService = await service.getUserById(id);
      Handler(res, usersService[0], usersService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      let usersService: any = '';
      const user: IUser = req.body;
      usersService = await service.createUser(user);
      Handler(res, usersService[0], usersService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      let usersService: any = '';
      const id: string = req.params.id;
      usersService = await service.deleteUser(id);
      Handler(res, usersService[0], usersService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      let usersService: any = '';
      const id: string = req.params.id;
      const data: any = req.body;
      usersService = await service.updateUser(id, data);
      Handler(res, usersService[0], usersService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }
}

export default new usersController();
