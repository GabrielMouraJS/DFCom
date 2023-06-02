import { Injectable } from '@nestjs/common';
import { TokensRepository } from '../repositories/tokens.repository';

interface GenerateRefreshTokenUseCaseRequestDTO {
  userId: string;
}

@Injectable()
export class GenerateRefreshTokenUseCase {
  constructor(private tokensRepository: TokensRepository) {}

  async execute({
    userId,
  }: GenerateRefreshTokenUseCaseRequestDTO): Promise<string> {
    const refreshToken = await this.tokensRepository.saveRefreshToken(userId);

    return refreshToken;
  }
}
