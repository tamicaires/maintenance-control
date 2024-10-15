import { Tire } from "../entities/Tire";

export abstract class TireRepository {
  abstract create(tire: Tire): Promise<void>;
  abstract findBySerialNumber(fireNumber: string): Promise<Tire | null>;
}