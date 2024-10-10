import { User } from 'src/modules/user/entities/User';
import { Request } from 'express';
import { Role } from 'src/modules/role/entities/Role';
import { UserWithRoles } from 'src/types/user.interface';

export class AuthRequestModel extends Request {
  user: UserWithRoles
}
