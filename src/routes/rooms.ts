import { Router } from 'express';
import RoomController from '../controllers/room.controller';

const roomsRouter = Router();
const { create, list, join } = new RoomController();

roomsRouter.get('/', list);
roomsRouter.post('/create', create);
roomsRouter.post('/join/:id', join);

export default roomsRouter;
