import { Request } from 'express';
import { UserWithRoles } from 'src/types/user.interface';

export class AuthRequestModel extends Request {
  user: UserWithRoles
}
