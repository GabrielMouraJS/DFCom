import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GenerateRefreshTokenUseCase } from './use-cases/generate-refresh-token';
import { FindRefreshTokenUseCase } from './use-cases/find-refresh-token';
import { DeleteRefreshTokenUseCase } from './use-cases/delete-refresh-token';

const USE_CASES = [
  GenerateRefreshTokenUseCase,
  FindRefreshTokenUseCase,
  DeleteRefreshTokenUseCase,
];
@Module({
  imports: [DatabaseModule],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class TokensModule {}
