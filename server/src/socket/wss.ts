import { WebSocketServer } from 'ws';
import RoomManager from '../domain/RoomManager';

interface IWebSocketMessage {
  requestType: string;
  roomId: string;
  userName: string;
  data?: any;
}

const Wss = new WebSocketServer({ noServer: true });

Wss.on('connection', ws => {
  // TODO: Create node_worker for threads

  console.log('new websocket connection!');

  ws.on('message', message => {
    const parseMessage: IWebSocketMessage = JSON.parse(message.toString());

    if (parseMessage.requestType == 'enter_room') {
      RoomManager.addClient(parseMessage.roomId, ws);
      return;
    }

    if (parseMessage.requestType == 'leave_room') {
      RoomManager.removeClient(parseMessage.roomId, ws);
      ws.close();
      return;
    }

    if (parseMessage.requestType == 'message') {
      const users = RoomManager.getRoomUsers(parseMessage.roomId);

      for (const user of users) {
        if (user.readyState === user.OPEN) {
          user.send(
            JSON.stringify({
              type: 'message',
              userName: parseMessage.userName,
              content: parseMessage.data
            })
          );
        }
      }
      return;
    }
  });
});

export { Wss };
