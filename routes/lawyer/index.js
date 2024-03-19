import * as Schemas from './lawyer.schemas.js';
import { UserRole } from '../user/user-role.enum.js';
import { LawyerService } from '../../services/lawyer.service.js';

export default async (fastify, opts) => {
  const service = new LawyerService();

  fastify.post(
    '/',
    {
      ...Schemas.createOrUpdateLawyer,
      preHandler: [fastify.useAccessAuth(['access'], [UserRole.Lawyer])],
    },
    async (request, reply) => {
      const { id } = request.user;
      return service.createOrUpdate({
        userId: id,
        ...request.body,
      });
    },
  );
};
