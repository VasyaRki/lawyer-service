import * as Schemas from './user.schemas.js';
import { UserService } from '../../services/user.service.js';

export default async (fastify, opts) => {
  const service = new UserService();

  fastify.get('/lawyers', Schemas.getLawyers, async (request, reply) => {
    return service.findAllLawyers(request.query);
  });

  fastify.get('/lawyer/:id', Schemas.getLawyer, async (request, reply) => {
    return service.getOne(request.params, ['lawyer']);
  });

  fastify.patch(
    '/',
    {
      ...Schemas.updateUser,
      preHandler: [fastify.useAccessAuth(['access'])],
    },
    async (request, reply) => {
      const { id } = request.user;
      const { username, avatar } = request.body;

      return service.update(id, { username, avatar });
    },
  );

  fastify.delete(
    '/',
    {
      ...Schemas.deleteUser,
      preHandler: [fastify.useAccessAuth(['access'])],
    },
    async (request, reply) => {
      const { id } = request.user;

      return service.deleteById(id);
    },
  );
};
