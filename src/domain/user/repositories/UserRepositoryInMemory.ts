import { RoleEnum } from 'src/infra/http/modules/ability/enums/role.enum';
import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  findUserWithRole(userId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findById(id: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }

  public users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
