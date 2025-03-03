import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "src/core/domain/entities/part-request";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { PrismaService } from "../prisma.service";
import { PrismaPartRequestMapper } from "../mappers/prisma-part-request-mapper";
import { RejectPartRequestDTO } from "src/application/part-request/dto/reject-part-request-dto";
import { ApprovePartRequestDTO } from "src/application/part-request/dto/approve-part-request-dto";
import { PartRequestWithRelationalInfo } from "src/presenters/part-request/view-model/part-request-view-model";
import { MaintenanceFilters, PartRequestFilters } from "src/shared/types/filters.interface";
import { Prisma } from "@prisma/client";
import { IPartRequestRelationalData, IPartRequestsRelationalDataList } from "src/shared/types/part-request/part-request-relational-data";

@Injectable()
export class PrismaPartRequestRepository implements PartRequestRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, data: PartRequest): Promise<void> {
    const partRequestRaw = PrismaPartRequestMapper.toPrisma(data);

    await this.prisma.partRequest.create({
      data: partRequestRaw
    })
  }

  async createBatch(data: PartRequest[]): Promise<PartRequest[]> {
    const partRequestsRaw = data.map(PrismaPartRequestMapper.toPrisma);

    await this.prisma.partRequest.createMany({
      data: partRequestsRaw,
    });

    return data;
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<any> {
    const partRequestRaw = await this.prisma.partRequest.findUnique({
      where: { id, part: { companyId: companyInstance.getCompanyId() } },
      include: {
        part: {
          select: {
            id: true,
            name: true,
            partNumber: true,
            stockQuantity: true
          }
        },
        requestedBy: {
          select: {
            id: true,
            name: true
          }
        },
        workOrder: {
          select: {
            id: true,
            displayId: true
          }
        },
        handledBy: {
          select: {
            id: true,
            name: true
          }
        },
        trailer: {
          select: {
            id: true,
            plate: true,
            position: true,
            axles: {
              select: {
                id: true,
                position: true
              }
            }
          }
        },
      }
    });

    if (!partRequestRaw) {
      return null;
    }
    console.log("partRequestRaw", partRequestRaw);
    return partRequestRaw;
  }

  async list(companyInstance: CompanyInstance, page: number, perPage: number, filters?: PartRequestFilters): Promise<IPartRequestsRelationalDataList> {
    const { status, startDate, endDate } = filters || {};

    const where: Prisma.PartRequestWhereInput = {
      AND: [
        { part: { companyId: companyInstance.getCompanyId() } },
        status ? { status } : undefined,
        startDate && endDate
          ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
          : undefined,
      ].filter(Boolean) as Prisma.PartRequestWhereInput[],
    };

    const partRequestsRaw = await this.prisma.partRequest.findMany({
      where,
      include: {
        part: {
          select: {
            id: true,
            name: true,
            partNumber: true,
            stockQuantity: true
          }
        },
        requestedBy: {
          select: {
            id: true,
            name: true
          }
        },
        workOrder: {
          select: {
            id: true,
            displayId: true
          }
        },
        handledBy: {
          select: {
            id: true,
            name: true
          }
        },
        trailer: {
          select: {
            id: true,
            plate: true,
            position: true,
            axles: {
              select: {
                id: true,
                position: true
              }
            }
          }
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        requestedAt: 'desc'
      },
    });

    const totalPartRequests = await this.prisma.partRequest.count({
      where,
    });

    const response: IPartRequestsRelationalDataList = { partRequests: partRequestsRaw, total: totalPartRequests };
    console.log("response", response)
    response.partRequests.map((request) => {
      console.log("axles", request.trailer)
    })
    return response;
  }

  // async list(companyInstance: CompanyInstance): Promise<any> {


  // }

  async listByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<IPartRequestRelationalData[]> {
    const partRequestsRaw = await this.prisma.partRequest.findMany({
      where: {
        workOrderId: workOrderId,
        part: { companyId: companyInstance.getCompanyId() }
      },
      include: {
        part: {
          select: {
            id: true,
            name: true,
            partNumber: true,
            stockQuantity: true
          }
        },
        requestedBy: {
          select: {
            id: true,
            name: true
          }
        },
        workOrder: {
          select: {
            id: true,
            displayId: true
          }
        },
        handledBy: {
          select: {
            id: true,
            name: true
          }
        },
        trailer: {
          select: {
            id: true,
            plate: true,
            position: true,
            axles: {
              select: {
                id: true,
                position: true
              }
            }
          }
        },
      },
    });
    return partRequestsRaw;
  }

  async reject(companyInstance: CompanyInstance, rejectData: RejectPartRequestDTO): Promise<void> {
    await this.prisma.partRequest.update({
      where: {
        id: rejectData.partRequestId,
        part: {
          companyId: companyInstance.getCompanyId()
        }
      },
      data: {
        status: rejectData.status,
        rejectionReason: rejectData.rejectionReason,
        handledById: rejectData.handleById,
        handledAt: rejectData.handleAt
      }
    })
  }

  async approve(companyInstance: CompanyInstance, approveData: ApprovePartRequestDTO): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      await prisma.partRequest.update({
        where: {
          id: approveData.partRequestId,
          part: {
            companyId: companyInstance.getCompanyId()
          }
        },
        data: {
          status: approveData.status,
          approvedQuantity: approveData.approvedQuantity,
          handledById: approveData.handleById,
          handledAt: approveData.handleAt,
        }
      });

      await prisma.part.update({
        where: {
          id: approveData.partId,
          companyId: companyInstance.getCompanyId()
        },
        data: { stockQuantity: approveData.stockQuantity }
      });
    });
  }

}