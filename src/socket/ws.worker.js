import { parentPort } from 'worker_threads';

if (!parentPort) throw new Error('No parent port!');

// filtra as mensagens vinda no websocket e repassa para a thread principal (parentPort)
parentPort.on('message', (msg) => {
  if (msg.requestType === 'enter_room') {
    parentPort.postMessage({ action: 'enter_room', roomId: msg.roomId });
  }
  if (msg.requestType === 'leave_room') {
    parentPort.postMessage({ action: 'leave_room', roomId: msg.roomId });
  }
  if (msg.requestType === 'message') {
    parentPort.postMessage({
      action: 'broadcast',
      roomId: msg.roomId,
      userName: msg.userName,
      content: msg.data
    });
  }
});