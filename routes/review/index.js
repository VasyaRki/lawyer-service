import { ReviewService } from '../../services/review.service.js';
import * as Schemas from './review.schemas.js';

export default async (fastify, opts) => {
  const service = new ReviewService();

  fastify.get(
    '/:lawyerId',
    { ...Schemas.getReviews, preHandler: fastify.useAccessAuth(['access']) },
    async (request, reply) => {
      const { lawyerId } = request.params;

      return service.findAllReviews(lawyerId);
    },
  );

  fastify.post(
    '/',
    { ...Schemas.createReview, preHandler: fastify.useAccessAuth(['access']) },
    async (request, reply) => {
      const { id } = request.user;
      const { text, mark, lawyerId } = request.body;

      return service.create({ text, mark, lawyerId, clientId: id });
    },
  );

  fastify.delete(
    '/',
    {
      ...Schemas.deleteById,
      preHandler: [fastify.useAccessAuth(['access'])],
    },
    async (request, reply) => {
      const { id } = request.user;
      const { reviewId } = request.body;

      return service.deleteById({ userId: id, reviewId });
    },
  );
};
