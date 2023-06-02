import { User } from '../entities/user.entity';

export abstract class UsersRepository {
  abstract findOneByEmail(email: string): Promise<User | null>;
  abstract findOneById(id: string): Promise<User | null>;
  abstract create(user: User): Promise<User>;
  abstract save(user: User): Promise<User>;
}
