import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/user.entity';

interface GetUserByIdUseCaseRequestDTO {
  id: string;
}
interface GetUserByIdUseCaseResponseDTO {
  user: User | undefined;
}
@Injectable()
export class GetUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetUserByIdUseCaseRequestDTO): Promise<GetUserByIdUseCaseResponseDTO> {
    const user = await this.usersRepository.findOneById(id);

    return {
      user,
    };
  }
}
