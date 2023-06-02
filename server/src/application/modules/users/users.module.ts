import { Module } from '@nestjs/common';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email';
import { DatabaseModule } from 'src/infra/database/database.module';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id';
import { CreateUserUseCase } from './use-cases/create-user';

const USE_CASES = [
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  CreateUserUseCase,
];
@Module({
  imports: [DatabaseModule],
  providers: [...USE_CASES],
  exports: [...USE_CASES],
})
export class UsersModule {}
