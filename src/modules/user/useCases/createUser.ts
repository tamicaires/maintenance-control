import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { hash } from 'bcrypt';
import { UserWithSameEmailException } from '../exceptions/UserWithSameEmailException';
import { Role } from 'src/modules/role/entities/Role';

interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  rolesIds: string[];
  companyId: string;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) { }

  async execute({ email, name, password, companyId, rolesIds }: CreateUserRequest): Promise<User> {
    const userAlredyExist = await this.userRepository.findByEmail(email);

    if (userAlredyExist) throw new UserWithSameEmailException();

    const user = new User({
      email,
      name,
      password: await hash(password, 10),
      companyId,
    });
    
    await this.userRepository.create(user);
    // await this.userRepository.assignRoleToUser(user.id, rolesIds);

    // const roleAssignments = rolesIds.map(roleId => new RoleAssignment({
    //   roleId,
    //   userId,
    // }));

    // // Envia todas as atribuições para o repositório de uma vez
    // await this.roleAssignmentRepository.createMany(roleAssignments);
    
    return user;
  }
}
