import { ServiceWithEmployee } from 'src/shared/types/service.interface';
import { Service } from '../entities/service';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IServiceFilters } from 'src/shared/types/filters.interface';

export abstract class ServiceRepository {
  abstract create(service: Service): Promise<void>;
  abstract findById(companyInstance: CompanyInstance, id: string): Promise<Service | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(service: Service): Promise<void>;
  abstract findOne(companyInstance: CompanyInstance, serviceName: string): Promise<Service | null>;
  abstract findMany(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters: IServiceFilters
  ): Promise<Service[]>;
  abstract findByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<[]>;
}
