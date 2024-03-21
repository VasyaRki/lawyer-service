import { Model } from 'objection';
import { Chat } from './chat.js';
import { Lawyer } from './lawyer.js';

export class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get virtualAttributes() {
    return ['clienCount', 'rewievCount'];
  }

  static get relationMappings() {
    return {
      lawyer: {
        relation: Model.HasOneRelation,
        modelClass: Lawyer,
        join: {
          from: 'user.id',
          to: 'lawyer.userId',
        },
      },

      lawyerChats: {
        relation: Model.HasManyRelation,
        modelClass: Chat,
        join: {
          from: 'user.id',
          to: 'chat.lawyerId',
        },
      },

      userChats: {
        relation: Model.HasManyRelation,
        modelClass: Chat,
        join: {
          from: 'user.id',
          to: 'chat.clientId',
        },
      },
    };
  }
}
