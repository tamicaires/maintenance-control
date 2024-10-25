import { User as UserRaw } from '@prisma/client';
import { User } from 'src/core/domain/entities/user';

export class PrismaUserMapper {
  static toPrisma({
    id,
    email,
    name,
    password,
    createdAt,
    updatedAt,
  }: User): UserRaw {
    return {
      id,
      email,
      name,
      password,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    email,
    name,
    password,
    createdAt,
    updatedAt,
  }: UserRaw): User {
    return new User(
      {
        email,
        name,
        password,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
