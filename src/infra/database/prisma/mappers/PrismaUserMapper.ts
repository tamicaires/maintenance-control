import { User as UserRaw } from '@prisma/client';
import { Role } from 'src/modules/role/entities/Role';
import { User } from 'src/modules/user/entities/User';

interface UserWithRoles extends UserRaw {
  roles: Role[];
}
export class PrismaUserMapper {
  static toPrisma({
    id,
    email,
    name,
    password,
    companyId,
    createdAt,
    updatedAt,
  }: User): UserRaw {
    return {
      id,
      email,
      name,
      password,
      companyId,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    email,
    name,
    password,
    companyId,
    createdAt,
    updatedAt,
  }: UserRaw): User {
    return new User(
      {
        email,
        name,
        password,
        companyId,
        createdAt,
        updatedAt,
      },
      id,
    );
  }

  static toDomainWithRoles(user: UserWithRoles): User {
    const roles = user.roles.map((role) => role.name);
    return new User(
      {
        email: user.email,
        name: user.name,
        password: user.password,
        companyId: user.companyId,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      user.id,
    );
  }
}
