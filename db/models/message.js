import { Model } from 'objection';

export class Message extends Model {
  static get tableName() {
    return 'message';
  }
}
