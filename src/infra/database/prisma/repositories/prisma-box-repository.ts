import { Injectable } from "@nestjs/common";
import { BoxRepository } from "src/core/domain/repositories/box-repository";
import { PrismaService } from "../prisma.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { Box } from "src/core/domain/entities/box";
import { PrismaBoxMapper } from "../mappers/prisma-box-mapper";
import { MaintenanceStatus } from "src/core/enum/maitenance-status.enum";

@Injectable()
export class PrismaBoxRepository implements BoxRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, box: Box): Promise<void> {
    const boxRaw = PrismaBoxMapper.toPrisma(box);

    await this.prisma.box.create({
      data: boxRaw,
    });
  }

  async findById(companyInstance: CompanyInstance, id: string): Promise<Box | null> {
    const boxRaw = await this.prisma.box.findUnique({
      where: { id, companyId: companyInstance.getCompanyId() },
    });

    if (!boxRaw) {
      return null
    }

    return PrismaBoxMapper.toDomain(boxRaw);
  }

  async findByName(companyInstance: CompanyInstance, name: string): Promise<Box | null> {
    const boxRaw = await this.prisma.box.findUnique({
      where: { name, companyId: companyInstance.getCompanyId() },
    });

    if (!boxRaw) {
      return null
    }

    return PrismaBoxMapper.toDomain(boxRaw);
  }

  async list(companyInstance: CompanyInstance): Promise<Box[]> {
    const boxesRaw = await this.prisma.box.findMany({
      where: { companyId: companyInstance.getCompanyId() },
    });

    return boxesRaw.map(PrismaBoxMapper.toDomain);
  }

  async getWithRelationalData(companyInstance: CompanyInstance) {
    const boxesRaw = await this.prisma.box.findMany({
      where: {
        isActive: true,
        companyId: companyInstance.getCompanyId()
      },
      include: {
        workOrder: {
          where: {
            status: MaintenanceStatus.Manutencao
          },
          select: {
            id: true,
            displayId: true,
            typeOfMaintenance: true,
            entryMaintenance: true,
            status: true,
            fleet: {
              select: {
                id: true,
                fleetNumber: true
              }
            },
            serviceAssignments: {
              select: {
                id: true,
                status: true
              }
            }
          }
        }
      }
    })
    console.log("boxes", boxesRaw)
    return boxesRaw;
  }

  async delete(companyInstance: CompanyInstance, boxId: string): Promise<void> {
    await this.prisma.box.delete({
      where: { id: boxId, companyId: companyInstance.getCompanyId() },
    });
  }
}