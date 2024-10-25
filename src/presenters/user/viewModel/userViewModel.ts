import { User } from 'src/core/domain/entities/user';
import { TRole } from 'src/core/enum/role.enum';


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
