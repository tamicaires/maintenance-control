import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WorkOrderRepository } from 'src/modules/workOrder/repositories/workOrderRepository';
import { WorkOrder } from 'src/modules/workOrder/entities/WorkOrder';
import { PrismaWorkOrderMapper } from '../mappers/PrismaWorkOrderMapper';

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

  async findMany(page: number, perPage: number): Promise<any> {
    const workOrders = await this.prisma.workOrder.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return workOrders;
  }
}
