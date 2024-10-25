import { User } from '../../../core/domain/entities/user';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'tami@gmail.com',
      name: 'Tamires',
      password: '123456',
      ...override,
    },
    id,
  );
};
