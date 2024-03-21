import { Message } from '../db/models/message.js';
import { EntityService } from './entity.service.js';

export class MessageService extends EntityService {
  constructor() {
    super(Message);
  }
}
