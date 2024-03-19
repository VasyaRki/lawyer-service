import { UserRole } from './user-role.enum.js';
import { typeNumber, typeString } from '../../common/schema.types.js';

const typeUserRole = {
  type: 'string',
  enum: [UserRole.Admin, UserRole.Lawyer, UserRole.User],
};

const user = {
  id: typeNumber,
  email: typeString,
  phone: typeString,
  firstName: typeString,
  lastName: typeString,
  middleName: typeString,
  role: typeUserRole,
  avatar: typeString,
  created_at: typeString,
};

const lawyer = {
  id: typeNumber,
  education: typeString,
  experience: typeString,
  description: typeString,
  hourly_rate: typeNumber,
  created_at: typeString,
  updated_at: typeString,
};

export const getLawyers = {
  schema: {
    tags: ['Lawyer'],
    query: {
      type: 'object',
      properties: {
        order: { type: 'string', enum: ['ASC', 'DESC'] },
        orderField: typeString,
        search: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: user,
        },
      },
    },
  },
};

export const getLawyer = {
  schema: {
    tags: ['User'],
    params: {
      type: 'object',
      properties: {
        id: typeNumber,
      },
      required: ['id'],
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          ...user,
          lawyer: {type: 'object', properties: lawyer},
        },
      },
    },
  },
};

export const getUser = {
  schema: {
    tags: ['User'],
    params: {
      type: 'object',
      properties: {
        id: typeNumber,
      },
      required: ['id'],
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          ...user,
        },
      },
    },
  },
};

export const updateUser = {
  schema: {
    tags: ['User'],
    security: [{ ApiToken: [] }],
    body: {
      type: 'object',
      properties: {
        email: typeString,
        phone: typeString,
        firstName: typeString,
        lastName: typeString,
        middleName: typeString,
        avatar: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};

export const deleteUser = {
  schema: {
    tags: ['User'],
    security: [{ ApiToken: [] }],
    response: {
      '2xx': typeNumber,
    },
  },
};
