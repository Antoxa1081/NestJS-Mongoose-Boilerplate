import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';

export class AuthResponseDto {
  @ApiProperty()
  readonly access_token: string;
  @ApiProperty()
  readonly user: User;
}
