import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { UserRepository } from 'src/core/domain/repositories/user-repository';
import { User } from 'src/core/domain/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users.map(user => PrismaUserMapper.toDomain(user));
  }

  async findUserWithRole(userId: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        membership: {
          select: {
            role: true
          }
        }
      }
    });

    if (!user) return null;

    return user;
  }
}
