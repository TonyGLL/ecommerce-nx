import { Router } from 'express';
import mainController from './main.controller';

export const authRouter = Router();

authRouter
  .post('/login', mainController.login)
  .post('/forgot-password', mainController.forgotPassword)
  .put('/reset-password', mainController.resetPassword);
