import { Injectable } from '@nestjs/common';
import { TokensRepository } from '../repositories/tokens.repository';
import { Token } from '../entities/token.entity';

interface FindRefreshTokenUseCaseRequestDTO {
  id: string;
}

@Injectable()
export class FindRefreshTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({ id }: FindRefreshTokenUseCaseRequestDTO): Promise<Token> {
    const refreshToken = await this.tokensRepository.findRefreshToken(id);

    return refreshToken;
  }
}
