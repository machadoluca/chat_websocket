import WebSocket from 'ws';
import { DataSource } from '../database/connection';
import Room from './entities/Room';

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

  // TODO: implement remove room where all users disconnect from server
  public removeRoom(name: string) {}

  public addClient(roomId: string, client: WebSocket) {
    if (!roomId) return null;

    this.roomConnections.get(roomId)?.add(client);
    
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
