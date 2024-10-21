import { Carrier } from '../entities/Carrier';

export abstract class CarrierRepository {
  abstract create(carrier: Carrier): Promise<void>;
  abstract findById(id: string): Promise<Carrier | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(carrier: Carrier): Promise<void>;
  abstract findMany(page: number, perPage: number): Promise<Carrier[] | null>;
  abstract findOne(carrierName: string): Promise<Carrier | null>;
}
