import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { RefreshTokenResponseDto } from '../dtos/refresh-token-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { RegisterResponseDto } from '../dtos/register-response.dto';
import { RefreshTokenGuard } from '../guards/refresh-token.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'The user has been signed successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'The credentials are wrong.',
  })
  async login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'The user has been registered successfully',
    type: RegisterResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'User already registered',
    type: RegisterResponseDto,
  })
  register(@Body() body: RegisterRequestDto): Promise<RegisterResponseDto> {
    return this.authService.register(body);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  @ApiHeader({
    name: 'Authorization',
    description: 'Refresh Token',
  })
  @ApiResponse({
    status: 200,
    description: 'The token has been refresh.',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token invalid.',
    type: RefreshTokenResponseDto,
  })
  refreshToken(@Request() req: any) {
    return {
      token: req.user.token,
      refreshToken: req.user.refreshToken,
    };
  }
}
