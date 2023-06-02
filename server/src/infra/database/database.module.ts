import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users.repository';
import { UsersRepository } from 'src/application/modules/users/repositories/users.repository';
import { TokensRepository } from 'src/application/modules/tokens/repositories/tokens.repository';
import { PrismaTokensRepository } from './prisma/repositories/prisma-tokens.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TokensRepository,
      useClass: PrismaTokensRepository,
    },
  ],
  exports: [UsersRepository, TokensRepository],
})
export class DatabaseModule {}
