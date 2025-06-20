import { Router } from 'express';
import RoomController from '../controllers/room.controller';

const roomsRouter = Router();
const { create, list, enter } = new RoomController();

roomsRouter.get('/', list);
roomsRouter.post('/create', create);
roomsRouter.post('/join/:id', enter);

export default roomsRouter;
