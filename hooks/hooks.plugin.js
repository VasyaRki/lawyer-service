import fp from 'fastify-plugin';
import { AuthHandlersService } from './auth-handlers.service.js';

export default fp(async (fastify) => {
  const authHandlersService = new AuthHandlersService(fastify.jwt);

  fastify.decorate('useAccessAuth', authHandlersService.useAuth);

  fastify.decorate('useRefreshAuth', authHandlersService.useAuth(['refresh']));

  console.log('Hooks plugin registered.');
});
