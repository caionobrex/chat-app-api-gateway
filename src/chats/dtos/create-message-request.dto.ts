import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageRequestDto {
  @ApiProperty()
  message: string;
}
