import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User, UserDocument } from './schemas/user.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  @ApiBearerAuth()
  @ApiDefaultResponse({
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserMe(@CurrentUser() user: UserDocument): Promise<User> {
    this.logger.log('Pipka');
    return user;
  }
}
