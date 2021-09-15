import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiDefaultResponse({
    type: AuthResponseDto,
  })
  @UseGuards(AuthGuard('local'))
  @Post('sign-in')
  async signInUser(
    @Body() signInDto: SignInDto,
    @Request() req,
  ): Promise<AuthResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiDefaultResponse({
    type: AuthResponseDto,
  })
  @Post('sign-up')
  async signUpUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<AuthResponseDto> {
    const user = await this.usersService.create(createUserDto);
    return await this.authService.login(user);
  }
}
