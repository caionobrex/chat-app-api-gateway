import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './passport-strategies/jwt.strategy';
import { AuthService } from './service/auth.service';

const clientModules = [
  ClientsModule.registerAsync([
    {
      name: 'AUTH_SERVICE',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: Transport.TCP,
        options: {
          host: configService.get<string>('AUTH_SERVICE_HOST'),
          port: configService.get<number>('AUTH_SERVICE_PORT'),
        },
      }),
    },
  ]),
];

@Module({
  imports: [...clientModules],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [...clientModules],
})
export default class AuthModule {}
