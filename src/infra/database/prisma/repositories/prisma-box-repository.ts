import { Injectable } from "@nestjs/common";
import { BoxRepository } from "src/core/domain/repositories/box-repository";
import { PrismaService } from "../prisma.service";
import { CompanyInstance } from "src/core/company/company-instance";
import { Box } from "src/core/domain/entities/box";
import { PrismaBoxMapper } from "../mappers/prisma-box-mapper";

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
}