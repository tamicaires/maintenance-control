import { Role } from "../entities/Role";
import { TRole } from "../enum/role.enum";

export abstract class RoleRepository {
  abstract create(role: Role): Promise<void>;
  abstract findRoleById(id: string): Promise<Role | null>;
  abstract findRoleByName(name: TRole): Promise<Role | null>;
  // abstract findAll(): Promise<Role[]>;
  abstract listRoles(): Promise<Role[]>;
  abstract updateRole(role: Role): Promise<void>;
  abstract deleteRole(id: string): Promise<void>;
  // abstract findMany(filter: string, page: number, perPage: number): Promise<Role[]>;
}