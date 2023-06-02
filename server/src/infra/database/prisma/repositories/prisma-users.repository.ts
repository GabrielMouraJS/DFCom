import { Injectable } from '@nestjs/common';
import { User } from 'src/application/modules/users/entities/user.entity';
import { UsersRepository } from 'src/application/modules/users/repositories/users.repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../../mappers/prisma-user-mappers';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}
  public async findOneByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!prismaUser) {
      return null;
    }

    return PrismaUserMapper.toDomain(prismaUser) as User;
  }
  async findOneById(id: string): Promise<User> {
    const prismaUser = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!prismaUser) {
      return null;
    }

    return PrismaUserMapper.toDomain(prismaUser) as User;
  }

  async create(email: string, password: string): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        password,
      },
    });
    return PrismaUserMapper.toDomain(newUser) as User;
  }
  save(user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
