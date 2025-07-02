import 'reflect-metadata';
import { createServer } from 'node:http';
import { Wss } from './socket/wss';
import { DataSource } from './database/connection';
import app from './app';
import RoomManager from './domain/RoomManager';

// Cria a instância do servidor com o app (express) como dependência
const server = createServer(app);

// Ao inicializar o database executar o servidor.
DataSource.initialize()
  .then(() => {
    console.log('Database connected');
    RoomManager.loadRooms();

    // Quando a conexão for websocket faz a troca de protocolo e chama o servidor websocket
    server.on('upgrade', (request, connection, head) => {
      Wss.handleUpgrade(request, connection, head, ws => {
        Wss.emit('connection', ws, request);
      });
    });

    // Servidor escutando na porta definida
    server.listen(process.env.PORT, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
