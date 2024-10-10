import { Role } from 'src/modules/role/entities/Role';
import { User } from 'src/modules/user/entities/User';

interface UserWithRelationalInfo extends User {
  roles: Role[];
}
export class UserViewModel {
  static toHttp({
    createdAt,
    updatedAt,
    email,
    id,
    name,
    companyId,
  }: User) {
    return {
      id,
      email,
      name,
      companyId,
      createdAt,
      updatedAt,
    };
  }

  static toHttpWithRoles({
    createdAt,
    updatedAt,
    email,
    id,
    name,
    companyId,
    roles,
  }: UserWithRelationalInfo) {
    return {
      id,
      email,
      name,
      companyId,
      roles,
      createdAt,
      updatedAt,
    };
  }
  
  
}
