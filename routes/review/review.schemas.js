import { typeNumber, typeString } from '../../common/schema.types.js';

const review = {
  id: typeNumber,
  text: typeString,
  mark: typeNumber,
  clientId: typeNumber,
  lawyerId: typeNumber,
  firstName: typeString,
};

export const getReviews = {
  schema: {
    tags: ['Review'],
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: review,
        },
      },
    },
  },
};

export const createReview = {
  schema: {
    tags: ['Review'],
    security: [{ ApiToken: [] }],
    body: {
      type: 'object',
      required: ['text', 'mark', 'lawyerId'],
      properties: {
        text: typeString,
        mark: typeNumber,
        lawyerId: typeNumber,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: review,
      },
    },
  },
};

export const deleteReview = {
  schema: {
    tags: ['Review'],
    security: [{ ApiToken: [] }],
    response: {
      '2xx': typeNumber,
    },
  },
};
