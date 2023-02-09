import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty()
  user: string;

  @ApiProperty()
  password: string;
}
