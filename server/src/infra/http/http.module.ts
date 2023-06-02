import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule } from '../auth/auth.module';
import { TokensModule } from 'src/application/modules/tokens/tokens.module';
import { UsersController } from './users.controller';
import { UsersModule } from 'src/application/modules/users/users.module';

@Module({
  imports: [AuthModule, TokensModule, UsersModule],
  providers: [],
  exports: [],
  controllers: [AuthController, UsersController],
})
export class HttpModule {}
