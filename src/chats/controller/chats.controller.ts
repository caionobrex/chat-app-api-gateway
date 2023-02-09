import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateChatRequestDto } from 'src/auth/dtos/create-chat-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/shared/decorators/user.decorator';
import { CreateMessageRequestDto } from '../dtos/create-message-request.dto';
import { ChatsService } from '../service/chats.service';

@ApiTags('chats')
@UseGuards(JwtAuthGuard)
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  async findAllChats(@User() user) {
    return this.chatsService.findAllChats(user.id);
  }

  @Get(':id')
  async findChatById(@Param('id') id: string, @User() user) {
    return this.chatsService.findChatById(id, user.id);
  }

  @Get(':id/messages')
  async findChatMessages(@Param('id') id: string) {
    return this.chatsService.findChatMessages(id);
  }

  @Post()
  async createChat(@Body() data: CreateChatRequestDto, @User() user) {
    return this.chatsService.createChat(user.id, data.contactId);
  }

  @Post(':id/messages')
  async createMessage(
    @Param('id') chatId: string,
    @User() user,
    @Body() data: CreateMessageRequestDto,
  ) {
    return this.chatsService.createMessage(chatId, user.id, data);
  }

  @Delete('/messages/:id')
  async deleteMessage(@Param('id') messageId: string, @User() user) {
    return this.chatsService.deleteMessage(messageId, user.id);
  }
}
