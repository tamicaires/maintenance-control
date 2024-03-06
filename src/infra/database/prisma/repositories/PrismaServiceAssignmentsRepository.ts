import { ServiceAssignment } from "src/modules/serviceAssignment/entities/ServiceAssignment";
import { ServiceAssignmentRepository } from "src/modules/serviceAssignment/repositories/serviceAssignmentRepository";
import { PrismaService } from "../prisma.service";
import { PrismaServiceAssignmentMapper } from "../mappers/PrismaServiceAssignmentMapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaServiceAssignmentsRepository implements ServiceAssignmentRepository {
  constructor(private prisma: PrismaService){}

  async create(serviceAssignment: ServiceAssignment): Promise<void> {
    const serviceAssignmentRaw = PrismaServiceAssignmentMapper.toPrisma(
      serviceAssignment
    );

    await this.prisma.serviceAssignment.create({
      data: serviceAssignmentRaw
    });
  };

  async findById(id: string): Promise<ServiceAssignment | null> {
    const serviceAssignmentRaw = await this.prisma.serviceAssignment.findUnique({
      where: { id }
    });

    if(!serviceAssignmentRaw) return null;

    return PrismaServiceAssignmentMapper.toDomain(serviceAssignmentRaw);
  };

  async save(serviceAssignment: ServiceAssignment): Promise<void> {
    const serviceAssignmentRaw = PrismaServiceAssignmentMapper.toPrisma(
      serviceAssignment
    );

    await this.prisma.serviceAssignment.update({
      data: serviceAssignmentRaw,
      where: { id: serviceAssignmentRaw.id }
    });

  };

  async delete(id: string): Promise<void> {
    await this.prisma.serviceAssignment.delete({ where: { id } });
  };

  async findMany(page: number, perPage: number): Promise<ServiceAssignment[]> {
    const serviceAssignments = await this.prisma.serviceAssignment.findMany({
      take: perPage,
      skip: (page - 1) * perPage
    });

    return serviceAssignments.map(PrismaServiceAssignmentMapper.toDomain);
  };
};