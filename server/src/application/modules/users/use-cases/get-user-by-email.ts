import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';

interface GetUserByEmailUseCaseRequestDTO {
  email: string;
}
interface GetUserByEmailUseCaseResponseDTO {
  user: User | undefined;
}
@Injectable()
export class GetUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: GetUserByEmailUseCaseRequestDTO): Promise<GetUserByEmailUseCaseResponseDTO> {
    const user = await this.usersRepository.findOneByEmail(email);

    return {
      user,
    };
  }
}
