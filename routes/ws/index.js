import { WebSocketServer } from 'ws';
import { UserRole } from '../user/user-role.enum.js';
import { UserService } from '../../services/user.service.js';
import { ChatService } from '../../services/chat.service.js';
import { TokenService } from '../../services/token.service.js';

import http from 'http';

const clients = {};

export default async (fastify, opts) => {
  const tokenService = new TokenService(fastify.jwt);
  const userService = new UserService();
  const chatService = new ChatService();

  const server = http.createServer();

  const wss = new WebSocketServer({
    noServer: true,
  });

  server.on('upgrade', async function upgrade(request, socket, head) {
    let args = [];

    try {
      const token = request.url.split('/')[1].split('=')[1];
      const data = tokenService.validateToken(token, 'access');

      if (!data) {
        throw ApiError.Unauthorized();
      }

      const user = await userService.getOne({ id: data.id });

      if (!user) {
        throw ApiError.Unauthorized('User not exist.');
      }

      args.push(user);
    } catch (e) {
      socket.destroy();
    }

    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request, ...args);
    });
  });

  wss.on('connection', (ws, req, ...args) => {
    ws.user = args[0];
    clients[args[0].id] = ws;

    ws.on('message', async (data) => {
      const { id, role } = ws.user;

      const authorId = id;
      const authorField = role === UserRole.User ? 'clientId' : 'lawyerId';

      const dataJSON = await JSON.parse(data);

      const clientId = role === UserRole.User ? id : dataJSON.authorId;
      const lawyerId = role === UserRole.Lawyer ? id : dataJSON.authorId;

      await chatService.createMessage({
        clientId,
        lawyerId,
        authorId,
        authorField,
        text: dataJSON.text,
      });

      if (clients[dataJSON.authorId]) {
        clients[dataJSON.authorId].send(
          JSON.stringify({ text: dataJSON.text, authorId }),
        );
      }
    });
  });

  server.listen(3001);
};
