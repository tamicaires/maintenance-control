import { Vehicles } from "src/core/domain/entities/vehicle";
import { QueryCount } from "./query";

export interface IVehicleWithFleet extends Vehicles {
  fleet: {
    id: string;
    fleetNumber: string;
  } | null;
}


export interface IVehicleWithCount extends QueryCount {
  vehicles: IVehicleWithFleet[];
}