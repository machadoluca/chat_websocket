import { RequestHandler } from 'express';
import { z } from 'zod';
import { DataSource } from '../database/connection';
import { HttpResponse } from '../utils/HttpResponse';
import Room from '../domain/entities/Room';
import RoomManager from '../domain/RoomManager';

class RoomController {
  private readonly repository = DataSource.getRepository(Room);

  public list: RequestHandler = async (request, response) => {
    const openRooms = this.repository.find();

    response.send({
      message: 'Sucesso',
      data: openRooms
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
      throw new HttpResponse(400, "Dados inválidos", result.error);
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

  public enter: RequestHandler = async (request, response) => {
    const { id } = request.params;

    response.send({
      message: 'Sucesso',
      data: id
    });
  };
}

export default RoomController;
