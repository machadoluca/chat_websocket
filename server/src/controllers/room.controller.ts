import { RequestHandler } from 'express';
import { z } from 'zod';
import { DataSource } from '../database/connection';
import { HttpErrorResponse } from '../utils/HttpErrorResponse';
import Room from '../domain/entities/Room';
import RoomManager from '../domain/RoomManager';

class RoomController {
  private readonly repository = DataSource.getRepository(Room);

  public list: RequestHandler = async (request, response) => {
    const rooms = await this.repository.find();

    response.send({
      message: 'Sucesso',
      data: rooms
    });
  };

  public create: RequestHandler = async (request, response) => {
    const roomSchema = z.object({
      name: z.string(),
      hostId: z.string(),
      userLimit: z.number()
    });

    const result = roomSchema.safeParse(request.body);

    if (!result.success) {
      throw new HttpErrorResponse(400, "Dados inválidos", result.error);
    }

    const { name, hostId, userLimit }: z.infer<typeof roomSchema> = request.body;

    const createdRoom = await this.repository.save({
      name,
      userLimit,
      host: { id: hostId }
    });
    
    RoomManager.createRoom(createdRoom.id);
    
    response.send({ 
      message: 'Sala criada',
      data: createdRoom
    });
  };

  public join: RequestHandler = async (request, response) => {
    const { id } = request.params;

    const room = await this.repository.findOne({ where: { id }})

    if(!room) throw new HttpErrorResponse(400, 'Sala não encontrada', null);

    if(RoomManager.getRoomSize(room.id) === room.userLimit) {
      throw new HttpErrorResponse(400, 'Sala cheia', null);
    }

    response.send({
      message: 'Sucesso',
      data: {
        roomId: room.id
      }
    });
  };
}

export default RoomController;
