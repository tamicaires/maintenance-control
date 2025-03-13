import { Axle } from "src/core/domain/entities/axle";
import { Fleet } from "src/core/domain/entities/fleet";
import { QueryCount } from "../query";

export interface ITrailerWithRelationalData {
  id: string;
  plate: string;
  position: number | null;
  isActive: boolean;
  axles?: Pick<Axle, 'id' | 'position'>[];
  fleet?: Pick<Fleet, 'id' | 'fleetNumber'> | null;
}

export interface ITrailerWithCount extends QueryCount {
  trailers: ITrailerWithRelationalData[];
}