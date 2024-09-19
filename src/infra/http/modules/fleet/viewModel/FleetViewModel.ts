import { Fleet } from 'src/modules/fleet/entities/Fleet';

interface FleetWithCarrier extends Fleet {
  carrier: { carrierName: string };
}
export class FleetViewModel {
  static toHttp(fleet: Fleet | FleetWithCarrier) {
    const carrierName = (fleet as FleetWithCarrier).carrier?.carrierName ?? '';
    return {
      id: fleet.id,
      fleetNumber: fleet.fleetNumber,
      plate: fleet.plate,
      firstTrailerPlate: fleet.firstTrailerPlate,
      secondTrailerPlate: fleet.secondTrailerPlate,
      thirdTrailerPlate: fleet.thirdTrailerPlate,
      carrierId: fleet.carrierId,
      carrierName,
      km: fleet.km,
      isActive: fleet.isActive,
      createdAt: fleet.createdAt,
      updatedAt: fleet.updatedAt,
    };
  }
}
