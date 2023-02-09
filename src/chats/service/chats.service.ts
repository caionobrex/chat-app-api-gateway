import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateMessageRequestDto } from '../dtos/create-message-request.dto';

@Injectable()
export class ChatsService {
  constructor(
    @Inject('CHAT_SERVICE') private readonly chatService: ClientProxy,
  ) {}

  async findAllChats(userId: number) {
    return this.chatService.send({ cmd: 'get-all-chats' }, { userId });
  }

  async findChatById(id: string, userId: string) {
    const res = await firstValueFrom(
      this.chatService.send({ cmd: 'get-chat-by-id' }, { id, userId }),
    );
    if (!res.chat) throw new UnauthorizedException();
    return res.chat;
  }

  async findChatMessages(chatId: string) {
    // todo
  }

  async createChat(userId: number, contactId: number) {
    return this.chatService.send(
      { cmd: 'create-chat' },
      { participants: [userId, contactId] },
    );
  }

  async createMessage(
    chatId: string,
    senderId: number,
    data: CreateMessageRequestDto,
  ) {
    return this.chatService.send(
      { cmd: 'create-message' },
      {
        chatId,
        senderId,
        message: data.message,
      },
    );
  }

  async deleteMessage(messageId: string, userId: number) {
    return this.chatService.send(
      { cmd: 'delete-message' },
      { userId, messageId: messageId },
    );
  }
}
