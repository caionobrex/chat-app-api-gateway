import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/shared/decorators/user.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@User() user) {
    return this.authService.send(
      { cmd: 'get-user-by-id' },
      { userId: user.id },
    );
  }
}
