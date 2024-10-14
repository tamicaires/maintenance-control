import { User as UserRaw } from '@prisma/client';
import { User } from 'src/modules/user/entities/User';

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
}
