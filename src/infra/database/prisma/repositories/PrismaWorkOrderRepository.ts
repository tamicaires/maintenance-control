import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaWorkOrderMapper } from '../mappers/PrismaWorkOrderMapper';
import { MaintenanceFilters } from 'src/shared/types/filters.interface';
import { Prisma } from '@prisma/client';
import { TypeOfMaintenance } from 'src/core/enum/type-of-maintenance.enum';
import { WorkOrderRepository } from 'src/core/domain/repositories/work-order-repository';
import { WorkOrder } from 'src/core/domain/entities/work-order';
import { CompanyInstance } from 'src/core/company/company-instance';
import { ICancelWorkOrder, IFinishMaintenance, IFinishWaitingParts, IStartMaintenance, IStartWaitingParts } from 'src/shared/types/work-order';
import { MaintenanceStatus } from 'src/core/enum/maitenance-status.enum';
import { getEndOfDay, getStartOfDay } from 'src/shared/utils/date-utils';

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
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters?: MaintenanceFilters,
  ): Promise<any> {
    const {
      displayId,
      fleetNumber,
      severityLevel,
      typeOfMaintenance,
      status,
      startDate,
      endDate
    } = filters || {};
    console.log("filters", filters)
    const where: Prisma.WorkOrderWhereInput = {
      companyId: companyInstance.getCompanyId(),
      AND: [
        displayId ? { displayId } : undefined,
        fleetNumber
          ? {
            fleet: {
              some: { fleetNumber },
            },
          }
          : undefined,
        severityLevel
          ? {
            severityLevel: Array.isArray(severityLevel)
              ? { in: severityLevel }
              : severityLevel,
          }
          : undefined,
        typeOfMaintenance
          ? {
            typeOfMaintenance: Array.isArray(typeOfMaintenance)
              ? { in: typeOfMaintenance }
              : typeOfMaintenance,
          }
          : undefined,
        status
          ? {
            status: Array.isArray(status)
              ? { in: status }
              : { in: status.split(',') },
          }
          : undefined,
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
      orderBy: {
        createdAt: 'desc',
      },
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
        user: {
          select: {
            id: true,
            name: true
          }
        }
      },
    });
    // console.log("workorders", workOrders)
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

  async getWorkOrderWithRelationalData(companyInstance: CompanyInstance, workOrderId: string): Promise<any> {
    const companyId = companyInstance.getCompanyId();

    const workOrderRaw = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId, companyId },
      include: {
        box: {
          select: {
            id: true,
            name: true,
            isActive: true,
          }
        },
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
          }
        },
        note: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
    })

    return workOrderRaw;
  }

  async cancelWorkOrder(companyInstance: CompanyInstance, data: ICancelWorkOrder): Promise<void> {
    const companyId = companyInstance.getCompanyId();

    await this.prisma.workOrder.update({
      where: {
        id: data.workOrderId,
        companyId
      },
      data: {
        isCancelled: data.isCancelled,
        status: data.status,
      },
    });
  }

  async startMaintenance(companyInstance: CompanyInstance, workOrderId: string, data: IStartMaintenance): Promise<void> {
    const companyId = companyInstance.getCompanyId();

    await this.prisma.workOrder.update({
      where: {
        id: workOrderId,
        companyId
      },
      data: {
        status: data.status,
        entryMaintenance: data.entryMaintenance,
        boxId: data.boxId,
      },
    });
  }

  async finishMaintenance(companyInstance: CompanyInstance, workOrderId: string, data: IFinishMaintenance): Promise<void> {
    const companyId = companyInstance.getCompanyId();

    await this.prisma.workOrder.update({
      where: {
        id: workOrderId,
        companyId
      },
      data: {
        status: data.status,
        exitMaintenance: data.exitMaintenance,
        exitSupervisor: data.exitSupervisor,
      },
    });
  }

  async backToQueue(companyInstance: CompanyInstance, workOrderId: string): Promise<void> {
    const companyId = companyInstance.getCompanyId();

    await this.prisma.workOrder.update({
      where: {
        id: workOrderId,
        companyId
      },
      data: {
        status: MaintenanceStatus.Fila,
        entryMaintenance: null,
        boxId: null,
      },
    });
  }

  async startWaitingParts(companyInstance: CompanyInstance, workOrderId: string, data: IStartWaitingParts): Promise<void> {
    const companyId = companyInstance.getCompanyId();

    await this.prisma.workOrder.update({
      where: {
        id: workOrderId,
        companyId
      },
      data: {
        status: data.status,
        startWaitingParts: data.startWaitingParts,
      },
    });
  }

  async finishWaitingParts(companyInstance: CompanyInstance, workOrderId: string, status: IFinishWaitingParts): Promise<void> {
    const companyId = companyInstance.getCompanyId();

    await this.prisma.workOrder.update({
      where: {
        id: workOrderId,
        companyId
      },
      data: {
        status: status.status,
        endWaitingParts: status.endWaitingParts,
      },
    });
  }

  async getDaily(companyInstance: CompanyInstance, startOfDay: Date, endOfDay: Date): Promise<any[]> {
    const companyId = companyInstance.getCompanyId()

    return this.prisma.workOrder.findMany({
      where: {
        companyId,
        OR: [
          {
            status: {
              in: [MaintenanceStatus.Fila, MaintenanceStatus.Manutencao, MaintenanceStatus.AguardandoPeca],
            },
          },
          {
            status: {
              in: [MaintenanceStatus.Finalizada, MaintenanceStatus.Cancelada],
            },
            createdAt: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        fleet: {
          select: {
            id: true,
            fleetNumber: true,
            carrier: {
              select: {
                id: true,
                carrierName: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })
  }

  //TODO Separar work order chart repository
  async getQueueChartData(companyInstance: CompanyInstance, startDate: Date, endDate: Date) {
    const companyId = companyInstance.getCompanyId()

    return this.prisma.workOrder.groupBy({
      by: ["entryQueue"],
      where: {
        companyId,
        status: MaintenanceStatus.Fila,
        entryQueue: {
          gte: startDate,
          lte: endDate,
        },
      },
      _count: {
        id: true,
      },
    })
  }

  async getTypeMaintenanceChartData(companyInstance: CompanyInstance, date: Date) {
    const companyId = companyInstance.getCompanyId()
    const startOfDay = getStartOfDay(date)
    const endOfDay = getEndOfDay(date)

    return this.prisma.workOrder.groupBy({
      by: ["typeOfMaintenance"],
      where: {
        companyId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      _count: {
        id: true,
      },
    })
  }

  async getServiceChartData(companyInstance: CompanyInstance, date: Date) {
    return []
    //   const companyId = companyInstance.getCompanyId()
    //   const startOfDay = getStartOfDay(date)
    //   const endOfDay = getEndOfDay(date)

    //   return this.prisma.serviceAssignment.groupBy({
    //     by: [""],
    //     where: {
    //       workOrder: {
    //         companyId,
    //         createdAt: {
    //           gte: startOfDay,
    //           lte: endOfDay,
    //         },
    //       },
    //     },
    //     _count: {
    //       id: true,
    //     },
    //     orderBy: {
    //       _count: {
    //         id: "desc",
    //       },
    //     },
    //     take: 5,
    //   })
  }
}
