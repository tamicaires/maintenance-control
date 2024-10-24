import { Vehicle as VehicleRaw } from "@prisma/client";
import { Vehicle } from "src/domain/vehicle/entitiy/Vehicle";

export class PrismaVehicleMapper {
  static toPrisma(vehicle: Vehicle): VehicleRaw {
    return {
      id: vehicle.id,
      plate: vehicle.plate,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      color: vehicle.color,
      km: vehicle.km,
      power: vehicle.power,
      isActive: vehicle.isActive,
      fleetId: vehicle.fleetId,
      companyId: vehicle.companyId,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    };
  }

  static toDomain(vehicle: VehicleRaw): Vehicle {
    return new Vehicle({
      plate: vehicle.plate,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
      color: vehicle.color,
      km: vehicle.km,
      power: vehicle.power,
      isActive: vehicle.isActive,
      fleetId: vehicle.fleetId,
      companyId: vehicle.companyId,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
    }, vehicle.id);
  }
}