import { Injectable } from "@nestjs/common";
import { RoleAssignmentRepository } from "src/modules/roleAssignment/repositories/RoleAssignmentRepository";
import { PrismaService } from "../prisma.service";
import { RoleAssignment } from "src/modules/roleAssignment/entities/RoleAssignment";

@Injectable()
export class PrismaRoleAssigmentRepository implements RoleAssignmentRepository {
  constructor(private prisma: PrismaService) { }

  async create(roleAssignment: RoleAssignment): Promise<void> {
    await this.prisma.userRole.create({
      data: roleAssignment
    });
  }
  async findRoleAssignmentById(id: string): Promise<RoleAssignment | null> {
    // const roleAssignment = await this.prisma.userRole.findUnique({
    //     where: {
    //         id,
    //     },
    // });
    // if (!roleAssignment) {
    //     return null;
    // }
    return null;
  }

  async createMany(roleAssignments: RoleAssignment[]): Promise<void> {
    // Mapeia os RoleAssignments para o formato que o Prisma entende, sem o 'id'
    const data = roleAssignments.map(assignment => ({
      id: assignment.id,
      userId: assignment.userId,
      roleId: assignment.roleId,
    }));

    // Usa o createMany do Prisma para criar todos de uma vez
    await this.prisma.userRole.createMany({
      data,
    });
  }
}