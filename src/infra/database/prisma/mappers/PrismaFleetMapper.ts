import { Fleet as FleetRaw } from '@prisma/client';
import { Fleet } from 'src/domain/fleet/entities/Fleet';

export class PrismaFleetMapper {
  static toPrisma(fleetRaw: Fleet): FleetRaw {
    return {
      id: fleetRaw.id,
      fleetNumber: fleetRaw.fleetNumber,
      carrierId: fleetRaw.carrierId,
      companyId: fleetRaw.companyId,
      plate: fleetRaw.plate,
      isActive: fleetRaw.isActive,
      km: fleetRaw.km,
      createdAt: fleetRaw.createdAt,
      updatedAt: fleetRaw.updatedAt,
    };
  }

  static toDomain(fleet: FleetRaw): Fleet {
    return new Fleet({
      plate: fleet.plate,
      carrierId: fleet.carrierId,
      companyId: fleet.companyId,
      fleetNumber: fleet.fleetNumber,
      isActive: fleet.isActive,
      km: fleet.km,
      createdAt: fleet.createdAt,
      updatedAt: fleet.updatedAt,
    }, fleet.id);
  }
}
