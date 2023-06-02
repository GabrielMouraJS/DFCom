import { RefreshToken } from '@prisma/client';
import { Token } from 'src/application/modules/tokens/entities/token.entity';

export class PrismaTokenMapper {
  static toDomain(raw: RefreshToken): Partial<Token> {
    return {
      id: raw.id,
      userId: raw.userId,
      expiresAt: raw.expiresAt,
    };
  }
}
