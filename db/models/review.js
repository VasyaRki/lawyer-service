import { Model } from 'objection';
import { User } from './user.js';

export class Review extends Model {
  static get tableName() {
    return 'review';
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'review.clientId',
          to: 'user.id',
        },
      },

      lawyer: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'review.lawyerId',
          to: 'user.id',
        },
      },
    };
  }
}
