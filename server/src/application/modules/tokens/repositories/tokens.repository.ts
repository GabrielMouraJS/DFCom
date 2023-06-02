import { Token } from '../entities/token.entity';

export abstract class TokensRepository {
  abstract findRefreshToken(id: string, userId: string): Promise<Token>;
  abstract saveRefreshToken(userId: string): Promise<string>;
}
