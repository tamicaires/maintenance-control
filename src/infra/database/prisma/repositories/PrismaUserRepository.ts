import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/User';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';

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
  async associateUserToCompany(companyId: string, userId: string): Promise<void> {
    const userRaw = await this.prisma.user.findUnique({ where: { id: userId } });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        company: {
          connect: { id: companyId },
        },
      },
    });
  }

  async findUserWithRole(userId: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      // include: {
      //   roles: {
      //     select: {
      //       role: {
      //         select: {
      //           id: true,
      //           name: true,
      //         }
      //       }
      //     },
      //   }
      // }
      include: {
        MemberShip: {
          select: {
            role: true
          }
        }
      }
    });

    if (!user) return null;

    return user;
  }

  async assignRoleToUser(userId: string, rolesIds: string[]): Promise<void> {
    // const result = await this.prisma.userRole.createMany({
    //   data: rolesIds.map(roleId => ({
    //     userId,
    //     roleId: roleId,
    //   })),
    // });
  }

}
