import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaFleetMapper } from '../mappers/PrismaFleetMapper';
import { FleetRepository } from 'src/domain/fleet/repositories/FleetRepository';
import { Fleet } from 'src/domain/fleet/entities/Fleet';
import { CompanyInstance } from 'src/core/company/company-instance';

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

  async findMany(page: number, perPage: number): Promise<any> {
    const fleets = await this.prisma.fleet.findMany({
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

    return fleets;
  }

  async findByPlate(companyInstance: CompanyInstance, plate: string): Promise<Fleet | null> {
    const fleetRaw = await this.prisma.fleet.findUnique({
      where: {
        companyId: companyInstance.getCompanyId(),
        plate,
      },
    })

    if (!fleetRaw) return null;

    return PrismaFleetMapper.toDomain(fleetRaw);
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
