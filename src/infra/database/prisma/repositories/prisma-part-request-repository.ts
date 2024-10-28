import { Injectable } from "@nestjs/common";
import { CompanyInstance } from "src/core/company/company-instance";
import { PartRequest } from "src/core/domain/entities/part-request";
import { PartRequestRepository } from "src/core/domain/repositories/part-request-repository";
import { PrismaService } from "../prisma.service";
import { PrismaPartRequestMapper } from "../mappers/prisma-part-request-mapper";

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

}