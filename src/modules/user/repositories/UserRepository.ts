import { User } from '../entities/User';
import { RoleEnum } from 'src/modules/role/enum/role.enum';

export abstract class UserRepository {
  abstract create(user: User): Promise<void>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract findUserWithRole(userId: string): Promise<any>;
  abstract associateUserToCompany(companyId: string, userId: string): Promise<void>;
  abstract assignRoleToUser(userId: string, rolesIds: string[]): Promise<void>;
}
