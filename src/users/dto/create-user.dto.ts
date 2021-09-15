import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique username',
    example: 'testuser',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly username: string;

  // @ApiProperty({
  //   description: 'Unique and valid email',
  //   example: '12345678',
  // })
  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  // readonly email: string;

  @ApiProperty({
    description: 'Password min len 8 chars',
    minLength: 8,
    example: '12345678',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
