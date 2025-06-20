import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:3333');

const messages = [
  'Olá servidor 2',
  'Como estás 2',
  'teste de mensagem para o servidor 2',
  'Que tédio 2'
];

ws.on('open', () => {
  console.log('🔌 Conectado ao servidor');

  // userId is a jwt
  ws.send(
    JSON.stringify({
      requestType: 'enter_room',
      userName: 'Wendell',
      roomId: '57c3248f-3a75-4b80-8a21-e5010c6c041c'
    })
  );

  const interval = setInterval(() =>
      ws.send(
        JSON.stringify({ 
          requestType: 'message',
          userName: 'Wendell',
          roomId: '57c3248f-3a75-4b80-8a21-e5010c6c041c',
          data: messages[Math.round(Math.random() * 3)] })
      ),
    2000
  );

  setTimeout(() => {
    clearInterval(interval);
    ws.send(JSON.stringify({
      requestType: 'leave_room',
      roomId: '57c3248f-3a75-4b80-8a21-e5010c6c041c'
    }))
    // ws.close();
  }, 40000)
});

ws.on('message', data => {
  console.log('📬 Resposta do servidor:', data.toString());
});
