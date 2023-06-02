import { Injectable } from '@nestjs/common';
import { TokensRepository } from '../repositories/tokens.repository';
import { Token } from '../entities/token.entity';

interface FindRefreshTokenUseCaseRequestDTO {
  userId: string;
  id: string;
}

@Injectable()
export class FindRefreshTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({
    userId,
    id,
  }: FindRefreshTokenUseCaseRequestDTO): Promise<Token> {
    const refreshToken = await this.tokensRepository.findRefreshToken(
      id,
      userId,
    );

    return refreshToken;
  }
}
