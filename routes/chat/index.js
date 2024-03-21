import * as Schemas from './chat.schemas.js';
import { UserRole } from '../user/user-role.enum.js';
import { ChatService } from '../../services/chat.service.js';

export default async (fastify, opts) => {
  const service = new ChatService();

  fastify.get(
    '/:id',
    {
      ...Schemas.getChat,
      preHandler: [fastify.useAccessAuth(['access'])],
    },
    async (request, reply) => {
      return service.getChatById(request.user.id, request.params.id);
    },
  );

  fastify.get(
    '/',
    {
      ...Schemas.getChats,
      preHandler: [fastify.useAccessAuth(['access'])],
    },
    async (request, reply) => {
      const { id, role } = request.user;

      const options =
        role === UserRole.User ? { clientId: id } : { lawyerId: id };

      return service.search(options);
    },
  );

  fastify.patch(
    '/',
    { preHandler: [fastify.useAccessAuth(['access'], [UserRole.Lawyer])] },
    async (request, reply) => {
      const { id } = request.user;

      return service.update({ ...request.body, userId: id });
    },
  );
};
