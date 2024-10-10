import { Role } from "src/modules/role/entities/Role";
import { TRole } from "src/modules/role/enum/role.enum";
import { RoleRepository } from "src/modules/role/repositories/roleRepository";
import { PrismaService } from "../prisma.service";
import { PrismaRoleMapper } from "../mappers/PrismaRoleMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private prisma: PrismaService) { }

  async create(roles: Role): Promise<void> {
    const roleRaw = PrismaRoleMapper.toPrisma(roles);

    await this.prisma.role.create({
      data: roleRaw,
    });
  }

  async findRoleById(id: string): Promise<Role | null> {
    throw new Error("Method not implemented.");
  }

  async findRoleByName(name: TRole): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: {
        name: name,
      },
    });

    if (!role) return null;
    return PrismaRoleMapper.toDomain(role);
  }

  async listRoles(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map(PrismaRoleMapper.toDomain);
  }
  updateRole(role: Role): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteRole(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}