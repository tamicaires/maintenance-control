import { Axle } from "src/core/domain/entities/axle";

export interface ITrailerWithAxles {
  id: string;
  plate: string;
  position: number;
  isActive: boolean;
  axles: Pick<Axle, 'id' | 'position'>[];
}