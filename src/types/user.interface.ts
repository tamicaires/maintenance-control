import { Role } from "src/modules/role/entities/Role";
import { RoleEnum } from "src/modules/role/enum/role.enum";
import { User } from "src/modules/user/entities/User";

export interface UserWithRoles extends User {
  roles: Role[];
}