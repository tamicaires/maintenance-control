import { Injectable } from '@nestjs/common';
import { RoleAssignment } from '../entities/RoleAssignment';
import { RoleAssignmentRepository } from '../repositories/RoleAssignmentRepository';
import { RoleRepository } from 'src/modules/role/repositories/roleRepository';

interface CreateRoleAssignmentRequest {
  userId: string;
  rolesIds: string[];
}

@Injectable()
export class CreateManyRoleAssignment {
  constructor(
    private readonly roleAssignmentRepository: RoleAssignmentRepository,
    private readonly roleRepository: RoleRepository
  ) { }

  async execute({ rolesIds, userId }: CreateRoleAssignmentRequest) {
    const existingRoles = await this.roleRepository.listRoles();
    const existingRoleIds = existingRoles.map(role => role.id);

    // Verificar se todos os IDs fornecidos existem
    const invalidRoleIds = rolesIds.filter(roleId => !existingRoleIds.includes(roleId));
    if (invalidRoleIds.length > 0) {
      throw new Error(`Invalid role IDs: ${invalidRoleIds.join(', ')}`);
    }

    // Criar as atribuições de papéis
    const roleAssignments = rolesIds.map(roleId => new RoleAssignment({
      roleId,
      userId,
    }));

    // Envia todas as atribuições para o repositório de uma vez
    await this.roleAssignmentRepository.createMany(roleAssignments);

    return roleAssignments;
  }
}
