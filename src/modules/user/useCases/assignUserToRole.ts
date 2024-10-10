import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/UserRepository";
import { UserNotFoundException } from "../exceptions/UserNotFountException";
import { RoleRepository } from "src/modules/role/repositories/roleRepository";
import { RoleNotFoundException } from "src/modules/role/exceptions/RoleNotFoundException";
import { RoleAssignmentRepository } from "src/modules/roleAssignment/repositories/RoleAssignmentRepository";

interface AssignUserToRoleRequest {
  userId: string;
  rolesIds: string[];
}

@Injectable()
export class AssignUserToRole {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly roleAssignmentRepository: RoleAssignmentRepository
  ) { }

  async execute({ userId, rolesIds }: AssignUserToRoleRequest) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new UserNotFoundException();

    const roles = await Promise.all(
      rolesIds.map(id => this.roleRepository.findRoleById(id)));
    if (roles.some(role => !role)) throw new RoleNotFoundException();


    const roleIds = roles.map(role => role!.id);
    return this.userRepository.assignRoleToUser(user.id, roleIds);
  }
}