import { Service } from 'src/core/domain/entities/service';
import { PrismaServiceMapper } from '../mappers/PrismaServiceMapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { ServiceRepository } from 'src/core/domain/repositories/service-repository';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IServiceFilters } from 'src/shared/types/filters.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaServiceRepository implements ServiceRepository {
  constructor(private prisma: PrismaService) { }

  async create(service: Service): Promise<void> {
    const serviceRaw = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.create({
      data: serviceRaw,
    });
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<Service | null> {
    const serviceRaw = await this.prisma.service.findUnique({
      where: { id, companyId: companyInstance.getCompanyId() },
    });

    if (!serviceRaw) return null;

    return PrismaServiceMapper.toDomain(serviceRaw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.service.delete({ where: { id } });
  }

  async save(service: Service): Promise<void> {
    const serviceRaw = PrismaServiceMapper.toPrisma(service);

    await this.prisma.service.update({
      data: serviceRaw,
      where: { id: serviceRaw.id },
    });
  }

  async findMany(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters: IServiceFilters
  ): Promise<Service[]> {
    const { serviceName, serviceCategory } = filters;

    const where: Prisma.ServiceWhereInput = {
      companyId: companyInstance.getCompanyId(),
      AND: [
        serviceName ? { serviceName } : undefined,
        serviceCategory ? { serviceCategory } : undefined,
      ].filter(Boolean) as Prisma.ServiceWhereInput[],
    };

    const services = await this.prisma.service.findMany({
      where,
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return services.map(PrismaServiceMapper.toDomain);
  }

  async findOne(companyInstance: CompanyInstance, serviceName: string): Promise<Service | null> {
    const service = await this.prisma.service.findUnique({
      where: { serviceName: serviceName, companyId: companyInstance.getCompanyId() },
    });

    if (!service) return null;

    return PrismaServiceMapper.toDomain(service);
  }

  async findByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<any> {
    const companyId = companyInstance.getCompanyId();

    const services = await this.prisma.service.findMany({
      where: {
        serviceAssignmets: {
          some: {
            workOrderId,
            workOrder: { companyId }
          },
        }
      },
      include: {
        serviceAssignmets: {
          select: {
            // employee: {
            //   select: {
            //     id: true,
            //     name: true,
            //     job: {
            //       select: {
            //         jobTitle: true,
            //       },
            //     },
            //   },
            // },
          },
        },
      },
    });
    console.log("services", services)
    return services;
  }
}
