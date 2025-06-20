import { WebSocketServer } from "ws";
import RoomManager from "../domain/RoomManager";

interface IWebSocketMessage {
  requestType: string
  message: string
  hostId?: string
  roomId?: string
}

const Wss = new WebSocketServer({ noServer: true });

Wss.on('connection', ws => {
  // TODO: Create node_worker for threads
  console.log('new websocket connection!');

  ws.on('message', message => {
    const parseMessage: IWebSocketMessage = JSON.parse(message.toString())

    if (parseMessage.requestType == 'enter_room') {
      RoomManager.addClient(parseMessage.roomId, ws)
    }
    
    if (parseMessage.requestType == 'leave_room') {
      RoomManager.removeClient(parseMessage.roomId, ws)
      ws.close()
    }

    console.log('Receive message:', parseMessage);
    
    
    // ws.send(`Eco:${message.toString()}`);
    // Wss.clients.forEach(client => {
    //   if (client !== ws && client.readyState === client.OPEN) {
    //     client.send(`Message to another client: ${message}`);
    //   }
    // });
  });

  ws.send('👋 Bem-vindo ao servidor WebSocket!');
});

export { Wss }