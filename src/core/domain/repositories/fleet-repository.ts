import { CompanyInstance } from 'src/core/company/company-instance';
import { Fleet } from '../entities/fleet';

export abstract class FleetRepository {
  abstract create(fleet: Fleet): Promise<void>;
  abstract findById(id: string): Promise<Fleet | null>;
  abstract findByNumber(companyInstance: CompanyInstance, fleetNumber: string): Promise<Fleet | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(fleet: Fleet): Promise<void>;
  abstract findMany(companyInstance: CompanyInstance, page: number, perPage: number): Promise<Fleet[]>;
}
