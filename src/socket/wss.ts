import path from 'node:path';
import { Worker } from 'node:worker_threads';
import { WebSocketServer } from 'ws';
import RoomManager from '../domain/RoomManager';
import { fileURLToPath } from 'node:url';

interface IWebSocketMessage {
  requestType: string;
  roomId: string;
  userName: string;
  data?: any;
}

// Instancia o servidor websocket
const Wss = new WebSocketServer({ noServer: true });

// a cada conexão do servidor executa a seguinte funcão
Wss.on('connection', ws => {
  console.log('new websocket connection!');

  // cria uma thread para a conexão
  const worker = new Worker(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'ws.worker.js')
  );

  // para cada mensagem do cliente da um parse e manda para o worker (thread individual)
  ws.on('message', message => {
    const parseMessage: IWebSocketMessage = JSON.parse(message.toString());
    worker.postMessage(parseMessage);
  });

  // recebe as mensagens vinda da thread individual e faz o tratamento
  worker.on('message', msg => {
    // entrar na sala
    if (msg.action === 'enter_room') {
      RoomManager.addClient(msg.roomId, ws);
    }

    // sair da sala
    if (msg.action === 'leave_room') {
      RoomManager.removeClient(msg.roomId, ws);
      ws.close();
      worker.terminate();
    }
 
    // enviar a mensagem para outros usuários websocket na sala
    if (msg.action === 'broadcast') {
      const users = RoomManager.getRoomUsers(msg.roomId);
      for (const user of users) {
        if (user !== ws && user.readyState === user.OPEN) {
          user.send(
            JSON.stringify({
              type: 'message',
              userName: msg.userName,
              content: msg.content
            })
          );
        }
      }
    }
  });
});

export { Wss };
