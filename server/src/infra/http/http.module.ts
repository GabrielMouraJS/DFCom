import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule } from '../auth/auth.module';
import { TokensModule } from 'src/application/modules/tokens/tokens.module';

@Module({
  imports: [AuthModule, TokensModule],
  providers: [],
  exports: [],
  controllers: [AuthController],
})
export class HttpModule {}
