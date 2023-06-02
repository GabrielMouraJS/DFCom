import { Injectable } from '@nestjs/common';
import { TokensRepository } from '../repositories/tokens.repository';

interface DeleteRefreshTokenUseCaseRequestDTO {
  id: string;
}

@Injectable()
export class DeleteRefreshTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({ id }: DeleteRefreshTokenUseCaseRequestDTO): Promise<void> {
    await this.tokensRepository.deleteRefreshToken(id);
  }
}
