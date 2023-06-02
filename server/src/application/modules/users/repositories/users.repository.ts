import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findOneByEmail(email: string): Promise<User | null>;
  abstract findOneById(id: string): Promise<User | null>;
  abstract create(email: string, password: string): Promise<User>;
}
