import { RoleEnum } from 'src/modules/role/enum/role.enum';
import { User } from '../entities/User';
import { UserRepository } from './UserRepository';

export class UserRepositoryInMemory implements UserRepository {
  assignRoleToUser(userId: string, roles: RoleEnum[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findUserWithRole(userId: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  associateUserToCompany(companyId: string, userId: string): Promise<void> {
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
