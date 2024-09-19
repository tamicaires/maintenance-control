import { Fleet as FleetRaw } from '@prisma/client';
import { Fleet } from 'src/modules/fleet/entities/Fleet';

export class PrismaFleetMapper {
  static toPrisma(fleetRaw: Fleet): FleetRaw {
    return fleetRaw;
  }

  static toDomain(fleet: FleetRaw): Fleet {
    return new Fleet(fleet, fleet.id);
  }
}
