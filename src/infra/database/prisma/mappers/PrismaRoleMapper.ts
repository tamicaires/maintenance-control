import { Role as RoleRaw } from '@prisma/client';
import { Role } from 'src/modules/role/entities/Role';


export class PrismaRoleMapper {
  static toPrisma({ id, name }: Role): RoleRaw {
    return {
      id, name
    };
  }

  static toDomain({ id, name }: RoleRaw): Role {
    return new Role(
      {
        name,
      },
      id,
    );
  }
}
