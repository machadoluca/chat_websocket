import WebSocket from 'ws';
import { DataSource } from '../database/connection';
import Room from './entities/Room';

/*
- RoomManager é a entidade que administra a conexão websocket em memória
- ele reflete as salas criadas pelos usuários e inscreve as devidas conexões websocket nas mesmas
*/
class RoomManager {
  private roomConnections = new Map<string, Set<WebSocket>>();

  public constructor() {}

  public async loadRooms() {
    const persistRooms = await DataSource.getRepository(Room).find();
    
    for (const room of persistRooms) {
      this.roomConnections.set(room.id, new Set());
    }
    console.log(this.roomConnections);
  }
  
  public createRoom(id: string) {
    if (!this.roomConnections.has(id)) {
      this.roomConnections.set(id, new Set());
    }
  }

  public addClient(roomId: string, client: WebSocket) {
    if (!roomId) return null;

    this.roomConnections.get(roomId)?.add(client);
    console.log(this.roomConnections);
    
    if (!this.roomConnections.get(roomId)?.has(client)) {
      console.log('Erro ao inserir usuário na sala em memória');
    }
  }

  public removeClient(roomId: string, client: WebSocket) {
    if (!roomId) return;
    const room = this.roomConnections.get(roomId);
    
    if (room) {
      room.delete(client);

      if(this.roomConnections.get(roomId)?.size == 0) {
        this.roomConnections.delete(roomId);
        DataSource.getRepository(Room).delete(roomId);
      }
    }
  }

  public getRoomUsers(roomId: string) {
    return [...(this.roomConnections.get(roomId)?.values() ?? [])]
  }

  public getRoomSize(roomId: string) {
    return this.roomConnections.get(roomId)?.size
  }
}

export default new RoomManager();
