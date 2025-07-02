import cors from 'cors';
import express from 'express';
import usersRouter from './routes/users';
import roomsRouter from './routes/rooms';
import { errorHandler } from './middlewares/error.middleware';
import { authHandler } from './middlewares/auth.middleware';

// instância do framework express
const app = express();

// define middlewares de configuração
app.use(cors({ origin: 'http://localhost:5173' })); // Habilita CORS só pro front
app.use(express.json());

// define as rotas da aplicação
app.use('/rooms', authHandler, roomsRouter);
app.use('/user', usersRouter);

// define a rota de erro padrão para toda a aplicação
app.use(errorHandler);

export default app;
