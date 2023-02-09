import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginRequestDto } from '../dtos/login-request.dto';
import { LoginResponseDto } from '../dtos/login-response.dto';
import { RegisterRequestDto } from '../dtos/register-request.dto';
import { RegisterResponseDto } from '../dtos/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authServiceClient: ClientProxy,
  ) {}

  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    const res = await firstValueFrom(
      this.authServiceClient.send<LoginResponseDto>({ cmd: 'login' }, data),
    );
    if (!res.token) throw new UnauthorizedException();
    return res;
  }

  async register(data: RegisterRequestDto): Promise<RegisterResponseDto> {
    const res = await firstValueFrom(
      this.authServiceClient.send({ cmd: 'register' }, data),
    );
    if (!res.user) throw new ConflictException();
    return {
      ...res.user,
      token: res.token,
    };
  }
}
