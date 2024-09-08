import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WorkOrderRepository } from 'src/modules/workOrder/repositories/workOrderRepository';
import { WorkOrder } from 'src/modules/workOrder/entities/WorkOrder';
import { PrismaWorkOrderMapper } from '../mappers/PrismaWorkOrderMapper';
import { Filters } from 'src/types/filters.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaWorkOrderRepository implements WorkOrderRepository {
  constructor(private prisma: PrismaService) {}

  async create(workOrder: WorkOrder): Promise<void> {
    const workOrderRaw = PrismaWorkOrderMapper.toPrisma(workOrder);

    await this.prisma.workOrder.create({
      data: workOrderRaw,
    });
  }

  async findById(id: string): Promise<WorkOrder | null> {
    const workOrderRaw = await this.prisma.workOrder.findUnique({
      where: { id },
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
            plate: true,
            carrier: {
              select: {
                carrierName: true,
              },
            },
          },
        },
      },
    });

    return workOrders;
  }
}
