import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './stategies/local-strategy';
import { JwtStrategy } from './stategies/jwt-strategy';
import { UsersModule } from 'src/application/modules/users/users.module';
import { TokensModule } from 'src/application/modules/tokens/tokens.module';

@Module({
  imports: [
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {
        expiresIn: '180s',
      },
    }),
    UsersModule,
    TokensModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
