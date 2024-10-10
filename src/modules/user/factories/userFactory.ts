import { RoleEnum } from 'src/modules/role/enum/role.enum';
import { User } from '../entities/User';
import { Role } from '../enum/Roles';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'tami@gmail.com',
      name: 'Tamires',
      password: '123456',
      companyId: '1',
      ...override,
    },
    id,
  );
};
