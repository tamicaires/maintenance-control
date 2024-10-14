import { Axle } from "../entities/axle";

export abstract class AxleRepository {
  abstract create(axle: Axle): Promise<void>;
}