import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authHandler } from '../middlewares/auth.middleware';

// rotas http dos usuários
const usersRouter = Router();
// chama as funções do controller dos usuários
const { create, update, login } = new UserController();

usersRouter.post('/create', create);
usersRouter.post('/login', login);
usersRouter.put('/update', authHandler, update);

export default usersRouter;
