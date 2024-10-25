import { Tire } from "../entities/tire";

export abstract class TireRepository {
  abstract create(tire: Tire): Promise<void>;
  abstract findBySerialNumber(fireNumber: string): Promise<Tire | null>;
  abstract findById(tireId: string): Promise<Tire | null>;
  abstract save(tire: Tire): Promise<void>;
}