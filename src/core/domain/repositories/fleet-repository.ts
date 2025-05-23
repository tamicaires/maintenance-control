import { CompanyInstance } from 'src/core/company/company-instance';
import { Fleet } from '../entities/fleet';
import { FleetFilters } from 'src/shared/types/filters.interface';
import { IFleetWithCount } from 'src/presenters/fleet/viewModel/FleetViewModel';

export abstract class FleetRepository {
  abstract create(fleet: Fleet): Promise<void>;
  abstract findById(id: string): Promise<Fleet | null>;
  abstract findByNumber(companyInstance: CompanyInstance, fleetNumber: string): Promise<Fleet | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(fleet: Fleet): Promise<void>;
  abstract findMany(companyInstance: CompanyInstance, page: number, perPage: number, filter: FleetFilters): Promise<IFleetWithCount>;
}
