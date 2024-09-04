import { Fleet as FleetRaw } from '@prisma/client';
import { Fleet } from 'src/modules/fleet/entities/Fleet';
import { FleetStatus } from 'src/modules/fleet/enum/fleet-status.enum';

export class PrismaFleetMapper {
  static toPrisma({
    id,
    fleetNumber,
    plate,
    firstTrailerPlate,
    secondTrailerPlate,
    thirdTrailerPlate,
    km,
    carrierId,
    status,
    createdAt,
    updatedAt,
  }: Fleet): FleetRaw {
    return {
      id,
      fleetNumber,
      plate,
      firstTrailerPlate,
      secondTrailerPlate,
      thirdTrailerPlate,
      km,
      carrierId,
      status,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    fleetNumber,
    plate,
    firstTrailerPlate,
    secondTrailerPlate,
    thirdTrailerPlate,
    km,
    carrierId,
    status,
    createdAt,
    updatedAt,
  }: FleetRaw): Fleet {
    return new Fleet(
      {
        fleetNumber,
        plate,
        firstTrailerPlate,
        secondTrailerPlate,
        thirdTrailerPlate,
        km,
        carrierId,
        status: status as FleetStatus,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
