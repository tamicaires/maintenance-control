import { PrismaService } from '../prisma.service';
import { PrismaServiceAssignmentMapper } from '../mappers/PrismaServiceAssignmentMapper';
import { Injectable } from '@nestjs/common';
import { ServiceAssignmentRepository } from 'src/core/domain/repositories/service-assignment-repository';
import { ServiceAssignment } from 'src/core/domain/entities/service-assignment';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IAddServiceResponsible } from 'src/shared/types/service-assigment/add-service-responsibe';

@Injectable()
export class PrismaServiceAssignmentsRepository
  implements ServiceAssignmentRepository {
  constructor(private prisma: PrismaService) { }

  async create(serviceAssignment: ServiceAssignment): Promise<void> {
    const serviceAssignmentRaw =
      PrismaServiceAssignmentMapper.toPrisma(serviceAssignment);

    await this.prisma.serviceAssignment.create({
      data: serviceAssignmentRaw,
    });
  }

  async findById(id: string): Promise<ServiceAssignment | null> {
    const serviceAssignmentRaw = await this.prisma.serviceAssignment.findUnique(
      {
        where: { id },
      },
    );

    if (!serviceAssignmentRaw) return null;

    return PrismaServiceAssignmentMapper.toDomain(serviceAssignmentRaw);
  }

  async save(serviceAssignment: ServiceAssignment): Promise<void> {
    const serviceAssignmentRaw =
      PrismaServiceAssignmentMapper.toPrisma(serviceAssignment);

    await this.prisma.serviceAssignment.update({
      data: serviceAssignmentRaw,
      where: { id: serviceAssignmentRaw.id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.serviceAssignment.delete({ where: { id } });
  }

  async findMany(page: number, perPage: number): Promise<ServiceAssignment[]> {
    const serviceAssignments = await this.prisma.serviceAssignment.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return serviceAssignments.map(PrismaServiceAssignmentMapper.toDomain);
  }

  async findByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<any> {
    const companyId = companyInstance.getCompanyId()

    const serviceAssignment = await this.prisma.serviceAssignment.findMany({
      where: {
        workOrder: {
          id: workOrderId,
          companyId,
        },
      },
      include: {
        service: {
          select: {
            id: true,
            serviceName: true,
            serviceCategory: true
          }
        },
        // employee: {
        //   select: {
        //     id: true,
        //     name: true,
        //     job: {
        //       select: {
        //         jobTitle: true
        //       }
        //     }
        //   }
        // },
        trailer: {
          select: {
            id: true,
            position: true,
            plate: true,
          }
        }
      }
    })

    return serviceAssignment
  }

  async addResponsible(companyInstance: CompanyInstance, data: IAddServiceResponsible) {
  //
  }
}
