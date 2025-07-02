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
      roomId: '960760da-7519-402f-ba9f-232d7518836d'
    })
  );

  const interval = setInterval(() =>
      ws.send(
        JSON.stringify({ 
          requestType: 'message', 
          userName: 'Lucas',
          roomId: '960760da-7519-402f-ba9f-232d7518836d',
          data: messages[Math.round(Math.random() * 3)] })
      ),
    2000
  );

  setTimeout(() => {
    clearInterval(interval);
    ws.send(JSON.stringify({
      requestType: 'leave_room',
      roomId: '960760da-7519-402f-ba9f-232d7518836d'
    }))
    // ws.close();
  }, 10000)
});

ws.on('message', data => {
  console.log('📬 Resposta do servidor:', data.toString());
});
