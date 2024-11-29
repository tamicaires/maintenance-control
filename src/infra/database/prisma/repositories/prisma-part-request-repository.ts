import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "src/core/domain/entities/part-request";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { PrismaService } from "../prisma.service";
import { PrismaPartRequestMapper } from "../mappers/prisma-part-request-mapper";
import { RejectPartRequestDTO } from "src/application/part-request/dto/reject-part-request-dto";
import { ApprovePartRequestDTO } from "src/application/part-request/dto/approve-part-request-dto";
import { PartRequestWithRelationalInfo } from "src/presenters/part-request/view-model/part-request-view-model";

@Injectable()
export class PrismaPartRequestRepository implements PartRequestRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, data: PartRequest): Promise<void> {
    const partRequestRaw = PrismaPartRequestMapper.toPrisma(data);

    await this.prisma.partRequest.create({
      data: partRequestRaw
    })
  }

  async createBatch(data: PartRequest[]): Promise<void> {
    const partRequestsRaw = data.map(PrismaPartRequestMapper.toPrisma);

    await this.prisma.partRequest.createMany({
      data: partRequestsRaw,
    });
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


  async list(companyInstance: CompanyInstance): Promise<any> {
    const partRequestsRaw = await this.prisma.partRequest.findMany({
      where: {
        part: {
          companyId: companyInstance.getCompanyId()
        }
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
      orderBy: {
        requestedAt: 'desc'
      }
    });

    return partRequestsRaw;
  }

  async listByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<any[]> {
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
      }
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