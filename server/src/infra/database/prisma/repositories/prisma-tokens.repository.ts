import { Injectable } from '@nestjs/common';
import { TokensRepository } from 'src/application/modules/tokens/repositories/tokens.repository';
import { PrismaService } from '../prisma.service';
import { Add60MinutesToNow } from 'src/helpers/Add60Minutes';
import { Token } from 'src/application/modules/tokens/entities/token.entity';
import { PrismaTokenMapper } from '../../mappers/prisma-token-mapper';

@Injectable()
export class PrismaTokensRepository implements TokensRepository {
  constructor(private prismaService: PrismaService) {}
  async findRefreshToken(id: string): Promise<Token | null> {
    const raw = await this.prismaService.refreshToken.findFirst({
      where: {
        id: id,
      },
    });

    return raw ? (PrismaTokenMapper.toDomain(raw) as Token) : null;
  }
  async saveRefreshToken(userId: string): Promise<string> {
    const refreshToken = await this.prismaService.refreshToken.create({
      data: {
        userId: userId,
        expiresAt: Add60MinutesToNow(),
      },
    });

    return refreshToken.id;
  }
  async deleteRefreshToken(id: string): Promise<void> {
    await this.prismaService.refreshToken.delete({
      where: {
        id: id,
      },
    });
  }
}
