import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';

interface CreateUserUseCaseRequestDTO {
  email: string;
  password: string;
}
interface CreateUserUseCaseResponseDTO {
  user: User | undefined;
}
@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: CreateUserUseCaseRequestDTO): Promise<CreateUserUseCaseResponseDTO> {
    const userExists = await this.usersRepository.findOneByEmail(email);

    if (userExists) {
      throw new ForbiddenException('User already exists');
    }

    const user = await this.usersRepository.create(email, password);

    delete user.password;
    return {
      user,
    };
  }
}
