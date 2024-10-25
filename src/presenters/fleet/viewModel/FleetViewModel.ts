import { Fleet } from "src/core/domain/entities/fleet";

interface FleetWithCarrier extends Fleet {
  carrier: { carrierName: string };
}
export class FleetViewModel {
  static toHttp(fleet: Fleet | FleetWithCarrier) {
    const carrierName = (fleet as FleetWithCarrier).carrier?.carrierName ?? '';
    return {
      id: fleet.id,
      fleetNumber: fleet.fleetNumber,
      carrierId: fleet.carrierId,
      carrierName,
      isActive: fleet.isActive,
      createdAt: fleet.createdAt,
      updatedAt: fleet.updatedAt,
    };
  }
}
