import { Lawyer } from '../db/models/lawyer.js';
import { EntityService } from './entity.service.js';

export class LawyerService extends EntityService {
  constructor() {
    super(Lawyer);
  }

  async createOrUpdate(payload) {
    const lawyer = await super.getOne({ userId: payload.userId });

    if (lawyer) {
      return super.update(lawyer.id, payload);
    }

    return super.create(payload);
  }
}
