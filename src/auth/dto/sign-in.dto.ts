import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'testuser',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly username: string;

  @ApiProperty({
    example: '12345678',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
