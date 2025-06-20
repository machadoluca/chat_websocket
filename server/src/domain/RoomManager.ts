import WebSocket from 'ws';

class RoomManager {
  private roomConnections = new Map<string, Set<WebSocket>>();

  public constructor() {}

  public createRoom(id: string) {
    if (!this.roomConnections.has(id)) {
      this.roomConnections.set(id, new Set());
    }

  }

  public removeRoom(name: string) {}

  public addClient(roomId: string | undefined, client: WebSocket) {
    if (!roomId) return null;
    this.roomConnections.get(roomId)?.add(client);    
    
    if (!this.roomConnections.get(roomId)?.has(client)) {
      console.log('Erro ao inserir usuário na sala em memória');
    }
  }

  public removeClient(roomId: string | undefined, client: WebSocket) {
    if (!roomId) return null;

    if (this.roomConnections.has(roomId)) {
      this.roomConnections.get(roomId)?.delete(client);
      const connections = this.roomConnections.get("e5be9e95-c2ff-417b-98bb-51a1a9a86023");

      if (!connections) return []
      console.log('Usuários  websocket restantes na sala:', [...connections.values()].length);
    }
  }
}

export default new RoomManager();
