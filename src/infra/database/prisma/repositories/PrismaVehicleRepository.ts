import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { VehicleRepository } from "src/core/domain/repositories/vechicle-repository";
import { CompanyInstance } from "src/core/company/company-instance";
import { PrismaVehicleMapper } from "../mappers/PrismaVehicleMapper";
import { Vehicle, Vehicles } from "src/core/domain/entities/vehicle";
import { IVehicleFilters } from "src/shared/types/filters.interface";
import { Prisma } from "@prisma/client";
import { IVehicleWithCount } from "src/shared/types/vehicle";

@Injectable()
export class PrismaVehicleRepository implements VehicleRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, vehicle: Vehicles): Promise<Vehicles> {
    await this.prisma.vehicle.create({
      data: vehicle,
    });

    return vehicle;
  }

  async findByPlate(companyInstance: CompanyInstance, plate: string): Promise<Vehicle | null> {
    const vehicle = await this.prisma.vehicle.findFirst({
      where: {
        plate,
        companyId: companyInstance.getCompanyId(),
      },
    });

    if (!vehicle) {
      return null;
    }

    return PrismaVehicleMapper.toDomain(vehicle);
  }

  async list(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters: IVehicleFilters,
  ): Promise<IVehicleWithCount> {
    const {
      isActive,
      km,
      plate,
      startDate,
      endDate
    } = filters;

    const where: Prisma.VehicleWhereInput = {
      companyId: companyInstance.getCompanyId(),
      AND: [
        isActive ? { isActive } : undefined,
        plate ? { plate } : undefined,
        km ? { km } : undefined,
        startDate && endDate
          ? {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          }
          : undefined,
      ].filter(Boolean) as Prisma.VehicleWhereInput[],
    };

    const totalCount = await this.prisma.vehicle.count({ where });

    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        companyId: companyInstance.getCompanyId(),
      },
      include: {
        fleet: {
          select: {
            id: true,
            fleetNumber: true,
          }
        }
      },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return { vehicles, totalCount };
  }

}