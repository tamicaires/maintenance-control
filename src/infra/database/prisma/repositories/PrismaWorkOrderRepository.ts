import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaWorkOrderMapper } from '../mappers/PrismaWorkOrderMapper';
import { Filters } from 'src/shared/types/filters.interface';
import { Prisma } from '@prisma/client';
import { TypeOfMaintenance } from 'src/core/enum/type-of-maintenance.enum';
import { WorkOrderRepository } from 'src/core/domain/repositories/work-order-repository';
import { WorkOrder } from 'src/core/domain/entities/work-order';
import { CompanyInstance } from 'src/core/company/company-instance';

@Injectable()
export class PrismaWorkOrderRepository implements WorkOrderRepository {
  constructor(private prisma: PrismaService) { }

  async create(workOrder: WorkOrder): Promise<void> {
    const workOrderRaw = PrismaWorkOrderMapper.toPrisma(workOrder);

    await this.prisma.workOrder.create({
      data: workOrderRaw,
    });
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<WorkOrder | null> {
    const workOrderRaw = await this.prisma.workOrder.findUnique({
      where: { id, companyId: companyInstance.getCompanyId() },
    });

    if (!workOrderRaw) return null;

    return PrismaWorkOrderMapper.toDomain(workOrderRaw);
  }

  async save(workOrder: WorkOrder): Promise<void> {
    const workOrderRaw = PrismaWorkOrderMapper.toPrisma(workOrder);

    await this.prisma.workOrder.update({
      data: workOrderRaw,
      where: { id: workOrderRaw.id },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.workOrder.delete({
      where: { id },
    });
  }

  async findMany(
    page: number,
    perPage: number,
    filters?: Filters,
  ): Promise<any> {
    const { status, startDate, endDate } = filters || {};

    const where: Prisma.WorkOrderWhereInput = {
      AND: [
        status ? { status } : undefined,
        startDate && endDate
          ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
          : undefined,
      ].filter(Boolean) as Prisma.WorkOrderWhereInput[],
    };

    const workOrders = await this.prisma.workOrder.findMany({
      where,
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        fleet: {
          select: {
            fleetNumber: true,
            carrier: {
              select: {
                carrierName: true,
              },
            },
            trailers: {
              include: {
                axles: {
                  select: {
                    id: true,
                    position: true,

                  }
                }
              }
            },
            
          },
        },
      },
    });
    console.log("workorders", workOrders.map(wo => wo.fleet.trailers));
    return workOrders;
  }

  async findLastWorkOrderByType(
    typeOfMaintenance: TypeOfMaintenance,
  ): Promise<WorkOrder | null> {
    const workOrderRaw = await this.prisma.workOrder.findFirst({
      where: { typeOfMaintenance },
      orderBy: { createdAt: 'desc' },
    });
    if (!workOrderRaw) return null;

    return PrismaWorkOrderMapper.toDomain(workOrderRaw);
  }
}
