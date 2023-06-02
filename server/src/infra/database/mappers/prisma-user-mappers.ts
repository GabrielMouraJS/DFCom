import { User as RawUser } from '@prisma/client';
import { User } from 'src/application/modules/users/entities/user.entity';

export class PrismaUserMapper {
  static toDomain(raw: RawUser): Partial<User> {
    return {
      id: raw.id,
      email: raw.email,
      createdAt: raw.createdAt,
      password: raw.password,
    };
  }
}
