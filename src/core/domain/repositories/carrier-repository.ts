import { CompanyInstance } from 'src/core/company/company-instance';
import { Carrier } from '../entities/carrier';
import { CarrierFilters } from 'src/shared/types/filters.interface';
import { ICarrierWithCount } from 'src/presenters/carrier/viewModels/CarrierViewModel';

export abstract class CarrierRepository {
  abstract create(carrier: Carrier): Promise<void>;
  abstract findById(id: string): Promise<Carrier | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(carrier: Carrier): Promise<void>;
  abstract findMany(companyInstance: CompanyInstance, page: number, perPage: number, filters: CarrierFilters): Promise<ICarrierWithCount>;
  abstract findOne(carrierName: string): Promise<Carrier | null>;
}
