import { Model } from 'objection';
import { Lawyer }  from './lawyer.js';

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
    };
  }
}
