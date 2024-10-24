import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { VehicleRepository } from "src/domain/vehicle/repositories/VechicleRepository";
import { CompanyInstance } from "src/core/company/company-instance";
import { Vehicle } from "src/domain/vehicle/entitiy/Vehicle";
import { PrismaVehicleMapper } from "../mappers/PrismaVehicleMapper";

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


}