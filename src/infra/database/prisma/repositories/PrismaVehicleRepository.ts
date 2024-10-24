import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { VehicleRepository } from "src/core/domain/repositories/vechicle-repository";
import { CompanyInstance } from "src/core/company/company-instance";
import { PrismaVehicleMapper } from "../mappers/PrismaVehicleMapper";
import { Vehicle } from "src/core/domain/entities/vehicle";

@Injectable()
export class PrismaVehicleRepository implements VehicleRepository {
  constructor(private readonly prisma: PrismaService) { }

  async create(companyInstance: CompanyInstance, vehicle: Vehicle): Promise<Vehicle> {
    const vehicleRaw = PrismaVehicleMapper.toPrisma(vehicle);

    const createdVehicle = await this.prisma.vehicle.create({
      data: vehicleRaw,
    });

    return PrismaVehicleMapper.toDomain(createdVehicle);
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

  async list(companyInstance: CompanyInstance): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        companyId: companyInstance.getCompanyId(),
      },
    });

    return vehicles.map((vehicle) => PrismaVehicleMapper.toDomain(vehicle));
  }

}