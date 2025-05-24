import { PrismaService } from '../prisma.service';
import { Carrier } from "src/core/domain/entities/carrier";
import { PrismaCarrierMapper } from '../mappers/PrismaCarrierMapper';
import { Injectable } from '@nestjs/common';
import { CompanyInstance } from 'src/core/company/company-instance';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';
import { CarrierFilters } from 'src/shared/types/filters.interface';
import { Prisma } from '@prisma/client';
import { ICarrierWithCount } from 'src/presenters/carrier/viewModels/CarrierViewModel';

@Injectable()
export class PrismaCarrierRepository implements CarrierRepository {
  constructor(private prisma: PrismaService) { }

  async create(carrier: Carrier): Promise<void> {
    const carrierRaw = PrismaCarrierMapper.toPrisma(carrier);

    await this.prisma.carrier.create({
      data: carrierRaw,
    });
  }

  async findById(id: string): Promise<Carrier | null> {
    const carrierRaw = await this.prisma.carrier.findUnique({
      where: { id },
    });

    if (!carrierRaw) return null;

    return PrismaCarrierMapper.toDomain(carrierRaw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.carrier.delete({ where: { id } });
  }
  async save(carrier: Carrier): Promise<void> {
    const carrierRaw = PrismaCarrierMapper.toPrisma(carrier);

    await this.prisma.carrier.update({
      data: carrierRaw,
      where: {
        id: carrierRaw.id,
      },
    });
  }

  async findMany(companyInstance: CompanyInstance, page: number, perPage: number, filters: CarrierFilters): Promise<ICarrierWithCount> {
    const {
      isActive,
      startDate,
      endDate
    } = filters || {};

    const where: Prisma.CarrierWhereInput = {
      companyId: companyInstance.getCompanyId(),
      AND: [
        isActive ? { isActive } : undefined,
        startDate && endDate
          ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
          : undefined,
      ].filter(Boolean) as Prisma.CarrierWhereInput[],
    };

    const totalCount = await this.prisma.carrier.count({ where });

    const carriers = await this.prisma.carrier.findMany({
      where: {
        companyId: companyInstance.getCompanyId(),
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return {
      totalCount,
      carriers: carriers.map((carrier) => PrismaCarrierMapper.toDomain(carrier)),
    }
  }

  async findOne(carrierName: string): Promise<Carrier | null> {
    const carrier = await this.prisma.carrier.findUnique({
      where: { carrierName },
    });

    if (!carrier) return null;

    return PrismaCarrierMapper.toDomain(carrier);
  }
}
