import { Model } from 'objection';

export class Lawyer extends Model {
  static get tableName() {
    return 'lawyer';
  }
}
