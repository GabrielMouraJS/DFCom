import { Token } from '../entities/token.entity';

export abstract class TokensRepository {
  abstract findRefreshToken(id: string): Promise<Token>;
  abstract saveRefreshToken(userId: string): Promise<string>;
  abstract deleteRefreshToken(id: string): Promise<void>;
}
