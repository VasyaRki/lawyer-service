import { Model } from 'objection';
import { User } from './user.js';
import { Message } from './message.js';

export class Chat extends Model {
  static get tableName() {
    return 'chat';
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'chat.clientId',
          to: 'user.id',
        },
      },

      lawyer: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'chat.lawyerId',
          to: 'user.id',
        },
      },

      message: {
        relation: Model.HasManyRelation,
        modelClass: Message,
        join: {
          from: 'chat.id',
          to: 'message.chatId',
        },
      }
    };
  }
}
