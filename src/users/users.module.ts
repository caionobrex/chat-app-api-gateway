import { Module } from '@nestjs/common';
import AuthModule from 'src/auth/auth.module';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
})
export class UsersModule {}
