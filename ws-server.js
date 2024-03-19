import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

let id = 1;

wss.on('connection', (ws) => {
  ws.chatId = id;

  id++;

  ws.on('message', (data) => {
    const dataJSON = JSON.parse(data);

    wss.clients.forEach((client) => {
      if (client.chatId === dataJSON.id) {
        client.send(
          JSON.stringify({ message: dataJSON.message, from: ws.chatId }),
        );
      }
    });
  });
});

console.log('The WebSocket server is running on port 8080');

