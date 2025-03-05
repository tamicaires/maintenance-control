import { Fleet } from "src/core/domain/entities/fleet";

interface FleetWithCarrier extends Fleet {
  carrier: { carrierName: string };
}

export interface IFleet {
  id: string;
  fleetNumber: string;
  isActive: boolean;
  carrierId: string;
  companyId?: string;
  createdAt: Date;
  updatedAt: Date;
  carrier?: {
    carrierName: string;
  };
}

export interface IFleetWithCount {
  fleets: IFleet[];
  totalCount: number;
}

export class FleetViewModel {
  static toHttp(data: IFleet | FleetWithCarrier) {
    const carrierName = (data as FleetWithCarrier).carrier?.carrierName ?? '';
    return {
      id: data.id,
      fleetNumber: data.fleetNumber,
      carrierId: data.carrierId,
      carrierName,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  static toHttpWithCount(data: IFleetWithCount): IFleetWithCount {
    const fleets = data.fleets.map(FleetViewModel.toHttp);
    return {
      fleets: fleets,
      totalCount: data.totalCount,
    };
  }
}
