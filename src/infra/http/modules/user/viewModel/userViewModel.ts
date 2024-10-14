import { User } from 'src/modules/user/entities/User';
import { TRole } from '../../ability/enums/role.enum';

interface UserWithRelationalInfo extends User {
  roles: TRole[];
}
export class UserViewModel {
  static toHttp({
    createdAt,
    updatedAt,
    email,
    id,
    name,
  }: User) {
    return {
      id,
      email,
      name,
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
    roles,
  }: UserWithRelationalInfo) {
    return {
      id,
      email,
      name,
      roles,
      createdAt,
      updatedAt,
    };
  }


}
