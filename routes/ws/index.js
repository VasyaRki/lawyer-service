import { WebSocketServer } from 'ws';

const clients = {};

export default async (fastify, opts) => {
  const wss = new WebSocketServer({ port: 3001 });

  let id = 1;

  wss.on('connection', (ws) => {
    clients[id] = ws;

    id++;

    ws.on('message', (data) => {
      const dataJSON = JSON.parse(data);

      clients[dataJSON.id].send(
        JSON.stringify({ message: dataJSON.message, from: ws.chatId }),
      );
    });
  });
};
