import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaFleetMapper } from '../mappers/PrismaFleetMapper';
import { CompanyInstance } from 'src/core/company/company-instance';
import { FleetRepository } from 'src/core/domain/repositories/fleet-repository';
import { Fleet } from 'src/core/domain/entities/fleet';
import { FleetFilters } from 'src/shared/types/filters.interface';
import { Prisma } from '@prisma/client';
import { IFleetWithCount } from 'src/presenters/fleet/viewModel/FleetViewModel';

@Injectable()
export class PrismaFleetRepository implements FleetRepository {
  constructor(private prisma: PrismaService) { }

  async create(fleet: Fleet): Promise<void> {
    const fleetRaw = PrismaFleetMapper.toPrisma(fleet);

    await this.prisma.fleet.create({
      data: fleetRaw,
    });
  }

  async findById(id: string): Promise<any> {
    const fleetRaw = await this.prisma.fleet.findUnique({
      where: { id },
      include: {
        carrier: {
          select: {
            carrierName: true,
          },
        },
      },
    });

    if (!fleetRaw) return null;
    console.log('fleetRaw', fleetRaw);
    return fleetRaw;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.fleet.delete({ where: { id } });
  }
  async save(fleet: Fleet): Promise<void> {
    const fleetsRaw = PrismaFleetMapper.toPrisma(fleet);

    await this.prisma.fleet.update({
      data: fleetsRaw,
      where: {
        id: fleetsRaw.id,
      },
    });
  }

  async findMany(companyInstance: CompanyInstance, page: number, perPage: number, filters: FleetFilters): Promise<IFleetWithCount> {
    const {
      isActive,
      startDate,
      endDate
    } = filters || {};

    const where: Prisma.FleetWhereInput = {
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
      ].filter(Boolean) as Prisma.FleetWhereInput[],
    }; 

    const totalCount = await this.prisma.fleet.count({ where });

    const fleets = await this.prisma.fleet.findMany({
      where,
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        carrier: {
          select: {
            carrierName: true,
          },
        },
      },
    });

    return { fleets, totalCount };
  }

  async findByNumber(companyInstance: CompanyInstance, fleetNumber: string): Promise<Fleet | null> {
    const fleetRaw = await this.prisma.fleet.findUnique({
      where: {
        companyId: companyInstance.getCompanyId(),
        fleetNumber,
      },
    });

    if (!fleetRaw) return null;

    return PrismaFleetMapper.toDomain(fleetRaw);
  }
}
