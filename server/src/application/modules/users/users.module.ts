import { Module } from '@nestjs/common';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id';

@Module({
  imports: [DatabaseModule],
  providers: [GetUserByEmailUseCase, GetUserByIdUseCase],
  exports: [GetUserByEmailUseCase, GetUserByIdUseCase],
})
export class UsersModule {}
