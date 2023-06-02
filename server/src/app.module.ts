import { Module } from '@nestjs/common';
import { AuthModule } from './infra/auth/auth.module';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { UsersModule } from './application/modules/users/users.module';
import { TokensModule } from './application/modules/tokens/tokens.module';

@Module({
  imports: [AuthModule, DatabaseModule, HttpModule, UsersModule, TokensModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
