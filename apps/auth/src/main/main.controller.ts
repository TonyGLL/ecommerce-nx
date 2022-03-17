import { Request, Response } from 'express';
import Handler from '../handlers/request.handler';
import service from './main.service';

class authController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      let { email, password } = req.body;
      let authService = await service.signin(email, password);
      Handler(res, authService[0], authService[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async forgotPassword(req: Request, res: Response): Promise<any> {
    try {
      const email = req.body.email;
      const response = await service.forgotPassword(email);
      Handler(res, response[0], response[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<any> {
    try {
      let { token, email } = req.query;
      email = String(email).replace(' ', '+');
      if (!token) {
        return Handler(res, 400, { error: 'Error with token' });
      }
      const response = await service.resetPassword(req.body.new_password, String(email));
      Handler(res, response[0], response[1]);
    } catch (error) {
      Handler(res, 400, error);
    }
  }
}

export default new authController();
