import { Router } from 'express';
import usersController from './main.controller';

export const usersRouter = Router();

usersRouter
  .get('/', usersController.getUsers)
  .get('/:id', usersController.getUserById)
  .post('/', usersController.createUser)
  .put('/:id', usersController.updateUser)
  .delete('/:id', usersController.deleteUser);
