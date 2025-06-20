import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:3333');

const messages = [
  'Olá servidor',
  'Como estás',
  'teste de mensagem para o servidor',
  'Que tédio'
];

ws.on('open', () => {
  console.log('🔌 Conectado ao servidor');

  // userId is a jwt
  ws.send(
    JSON.stringify({
      requestType: 'enter_room',
      userId: '701192cf-6feb-48d4-878c-f6f56bf4bc31',
      roomId: 'e5be9e95-c2ff-417b-98bb-51a1a9a86023'
    })
  );

  const interval = setInterval(() =>
      ws.send(
        JSON.stringify({ message: messages[Math.round(Math.random() * 3)] })
      ),
    2000
  );

  setTimeout(() => {
    clearInterval(interval);
    ws.send(JSON.stringify({
      requestType: 'leave_room',
      roomId: 'e5be9e95-c2ff-417b-98bb-51a1a9a86023'
    }))
    ws.close();
  }, 10000)
});

ws.on('message', data => {
  console.log('📬 Resposta do servidor:', data.toString());
});
