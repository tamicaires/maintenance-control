import { Axle } from "../entities/axle";

export abstract class AxleRepository {
  abstract create(axle: Axle): Promise<void>;
  abstract getById(axleId: string): Promise<Axle | null>;
  abstract list(): Promise<Axle[]>;
}