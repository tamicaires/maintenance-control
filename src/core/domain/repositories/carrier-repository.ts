import { CompanyInstance } from 'src/core/company/company-instance';
import { Carrier } from '../entities/carrier';

export abstract class CarrierRepository {
  abstract create(carrier: Carrier): Promise<void>;
  abstract findById(id: string): Promise<Carrier | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(carrier: Carrier): Promise<void>;
  abstract findMany(companyInstance: CompanyInstance, page: number, perPage: number): Promise<Carrier[] | null>;
  abstract findOne(carrierName: string): Promise<Carrier | null>;
}
