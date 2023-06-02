import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/modules/users/use-cases/create-user';
import { hashPassword } from 'src/helpers/Hash';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { User } from 'src/application/modules/users/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('register')
  async register(@Body() createUseDTO) {
    const { password, email } = createUseDTO;
    const passwordHash = hashPassword(password);

    const { user } = await this.createUserUseCase.execute({
      password: passwordHash,
      email,
    });

    return {
      user,
    };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async me(@Request() req) {
    const user = req.user as User;

    return { user };
  }
}
