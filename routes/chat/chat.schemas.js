import { ChatStatus } from './chat-status.enum.js';
import { typeNumber, typeString } from '../../common/schema.types.js';

const typeChatStatus = {
  type: 'string',
  enum: [ChatStatus.Awaiting, ChatStatus.Completed, ChatStatus.InProcess],
};

const message = {
  id: typeNumber,
  text: typeString,
  chatId: typeNumber,
  lawyerId: typeNumber,
  clientId: typeNumber,
  created_at: typeString,
  updated_at: typeString,
};

const chat = {
  id: typeNumber,
  subject: typeString,
  clientId: typeNumber,
  lawyerId: typeNumber,
  status: typeChatStatus,
  created_at: typeString,
  updated_at: typeString,
};

export const updateChat = {
  schema: {
    tags: ['Chat'],
    body: {
      type: 'object',
      properties: {
        subject: typeString,
        status: typeChatStatus,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: chat,
      },
    },
  },
};

export const getChat = {
  schema: {
    tags: ['Chat'],
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
          ...chat,
          message: {
            type: 'array',
            items: {
              type: 'object',
              properties: message,
            },
          },
        },
      },
    },
  },
};

export const getChats = {
  schema: {
    tags: ['Chat'],
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: chat,
        },
      },
    },
  },
}
