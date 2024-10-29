import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "src/core/domain/entities/part-request";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { PrismaService } from "../prisma.service";
import { PrismaPartRequestMapper } from "../mappers/prisma-part-request-mapper";
import { RejectPartRequestDTO } from "src/application/part-request/dto/reject-part-request-dto";
import { ApprovePartRequestDTO } from "src/application/part-request/dto/approve-part-request-dto";

@Injectable()
export class PrismaPartRequestRepository implements PartRequestRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, data: PartRequest): Promise<void> {
    const partRequestRaw = PrismaPartRequestMapper.toPrisma(data);

    await this.prisma.partRequest.create({
      data: partRequestRaw
    })
  }
  async findById(companyInstance: CompanyInstance, id: string): Promise<PartRequest | null> {
    const partRequestRaw = await this.prisma.partRequest.findUnique({
      where: {
        id
      }
    });

    if (!partRequestRaw) {
      return null;
    }

    return PrismaPartRequestMapper.toDomain(partRequestRaw);
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
        }
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
  
      // // Verifique a quantidade em estoque antes da atualização
      // const part = await prisma.part.findUnique({
      //   where: {
      //     id: approveData.partId,
      //     companyId: companyInstance.getCompanyId()
      //   }
      // });
  
      // console.log(`Estoque antes do decremento: ${part?.stockQuantity}`);
      // console.log(`Quantidade aprovada: ${approveData.approvedQuantity}`);
  
      // // Atualizando a quantidade em estoque
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