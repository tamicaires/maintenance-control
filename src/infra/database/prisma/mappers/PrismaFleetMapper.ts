import { Fleet as FleetRaw } from '@prisma/client';
import { Fleet } from 'src/domain/fleet/entities/Fleet';

export class PrismaFleetMapper {
  static toPrisma(fleetRaw: Fleet): FleetRaw {
    return {
      id: fleetRaw.id,
      fleetNumber: fleetRaw.fleetNumber,
      carrierId: fleetRaw.carrierId,
      companyId: fleetRaw.companyId,
      isActive: fleetRaw.isActive,
      createdAt: fleetRaw.createdAt,
      updatedAt: fleetRaw.updatedAt,
    };
  }

  static toDomain(fleet: FleetRaw): Fleet {
    return new Fleet({
      carrierId: fleet.carrierId,
      companyId: fleet.companyId,
      fleetNumber: fleet.fleetNumber,
      isActive: fleet.isActive,
      createdAt: fleet.createdAt,
      updatedAt: fleet.updatedAt,
    }, fleet.id);
  }
}
