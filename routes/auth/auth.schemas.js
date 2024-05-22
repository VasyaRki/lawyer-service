
import { UserRole } from '../user/user-role.enum.js';
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

const tokens = {
  accessToken: typeString,
  refreshToken: typeString,
};

export const auth = {
  schema: {
    tags: ['Auth'],
    security: [{ ApiToken: [] }],
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};

export const signIn = {
  schema: {
    tags: ['Auth'],
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: typeString,
        password: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};

export const signUp = {
  schema: {
    tags: ['Auth'],
    body: {
      type: 'object',
      required: ['email', 'password', 'firstName', 'lastName', 'middleName', 'role'],
      properties: {
        email: typeString,
        firstName: typeString,
        lastName: typeString,
        middleName: typeString,
        role: typeString,
        password: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};

export const refresh = {
  schema: {
    tags: ['Auth'],
    security: [{ ApiToken: [] }],
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};
