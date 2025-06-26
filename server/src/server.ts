import 'reflect-metadata';
import { createServer } from 'node:http';
import { Wss } from './socket/wss';
import { DataSource } from './database/connection';
import app from './app';
import RoomManager from './domain/RoomManager';

const server = createServer(app);

DataSource.initialize()
  .then(() => {
    console.log('Database connected');
    RoomManager.loadRooms();

    server.on('upgrade', (request, connection, head) => {
      Wss.handleUpgrade(request, connection, head, ws => {
        Wss.emit('connection', ws, request);
      });
    });

    server.listen(process.env.PORT, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
