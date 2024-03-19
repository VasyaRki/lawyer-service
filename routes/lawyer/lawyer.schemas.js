import { typeNumber, typeString } from '../../common/schema.types.js';

const lawyer = {
  id: typeNumber,
  education: typeString,
  experience: typeString,
  description: typeString,
  hourly_rate: typeNumber,
  created_at: typeString,
  updated_at: typeString,
};

export const createOrUpdateLawyer = {
  schema: {
    tags: ['Lawyer'],
    body: {
      type: 'object',
      properties: {
        education: typeString,
        experience: typeString,
        description: typeString,
        hourly_rate: typeNumber,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          ...lawyer,
        },
      },
    },
  },
};
