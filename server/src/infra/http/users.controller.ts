import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/application/modules/users/use-cases/create-user';
import { hashPassword } from 'src/helpers/Hash';

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
}
