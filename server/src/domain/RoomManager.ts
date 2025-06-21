import WebSocket from 'ws';
import { DataSource } from '../database/connection';
import Room from './entities/Room';

class RoomManager {
  private roomConnections = new Map<string, Set<WebSocket>>();

  public constructor() {}

  public createRoom(id: string) {
    if (!this.roomConnections.has(id)) {
      this.roomConnections.set(id, new Set());
    }
  }

  public removeRoom(name: string) {}

  public addClient(roomId: string, client: WebSocket) {
    if (!roomId) return null;

    this.roomConnections.get(roomId)?.add(client);
    const connections = this.roomConnections.get(roomId);

    if (!connections) return []
    console.log('Usuários websocket na sala:', [...connections.values()].length);
    
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
        DataSource.getRepository(Room).delete(roomId)
        console.log(this.roomConnections);
      }
      console.log('Usuários websocket restantes na sala:', [...room.values()].length);
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
