import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authHandler } from '../middlewares/auth.middleware';

const usersRouter = Router();
const { create, update, login } = new UserController();

usersRouter.post('/create', create);
usersRouter.post('/login', login);
usersRouter.put('/update', authHandler, update);

export default usersRouter;
