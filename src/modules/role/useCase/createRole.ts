import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../repositories/roleRepository";
import { TRole } from "../enum/role.enum";
import { Role } from "../entities/Role";
import { RoleAlreadyExistsException } from "../exceptions/RoleAlreadyExistsException";

interface CreateRoleRequest {
  name: TRole;
}

@Injectable()
export class CreateRole {
  constructor(private readonly roleRepository: RoleRepository) { }

  async execute({ name }: CreateRoleRequest) {
    const roleAlreadyExists = await this.roleRepository.findRoleByName(name);
    if (roleAlreadyExists) throw new RoleAlreadyExistsException();

    const role = new Role({ name });

    return this.roleRepository.create(role);
  }
}