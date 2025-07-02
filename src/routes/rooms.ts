import { Router } from 'express';
import RoomController from '../controllers/room.controller';

// rotas http das salas
const roomsRouter = Router();
// chama as funções do controller de salas
const { create, list, join } = new RoomController();

roomsRouter.get('/', list);
roomsRouter.post('/create', create);
roomsRouter.post('/join/:id', join);

export default roomsRouter;
