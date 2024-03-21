import { Chat } from '../db/models/chat.js';
import { ApiError } from '../exceptions.js';
import { EntityService } from './entity.service.js';
import { MessageService } from './message.service.js';
import { ChatStatus } from '../routes/chat/chat-status.enum.js';

export class ChatService extends EntityService {
  constructor() {
    super(Chat);
    this.messageService = new MessageService();
  }

  async getChatById(userId, chatId) {
    const chat = await this.getOne({ id: chatId }, ['message']);

    if (!chat) {
      throw ApiError.BadRequest('Chat does not exist');
    }

    if (chat.clientId !== userId && chat.lawyerId !== userId) {
      throw ApiError.Forbidden();
    }

    return chat;
  }

  async findOrCreateChat(payload) {
    const chat = await this.getOne(payload);

    if (chat) {
      return chat;
    }

    return this.create({ ...payload, status: ChatStatus.Awaiting });
  }

  async createMessage(payload) {
    const { text, lawyerId, clientId } = payload;

    const chat = await this.findOrCreateChat({ lawyerId, clientId });

    return this.messageService.create({
      text,
      [payload.authorField]: payload.authorId,
      chatId: chat.id,
    });
  }

  async update(payload) {
    const { chatId, userId, ...options } = payload;

    const chat = await this.getOne({ id: chatId });

    if (!chat) {
      throw ApiError.BadRequest('Chat does not exist');
    }

    if (chat.lawyerId !== userId) {
      throw ApiError.Forbidden();
    }

    return this.update(chat.id, options);
  }
}
