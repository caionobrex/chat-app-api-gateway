import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ChatsController } from './controller/chats.controller';
import { ChatsService } from './service/chats.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'CHAT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('CHAT_SERVICE_HOST'),
            port: configService.get<number>('CHAT_SERVICE_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService],
})
export default class ChatModule {}
