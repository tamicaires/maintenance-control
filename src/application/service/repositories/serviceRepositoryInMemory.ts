import { IServiceWithCount, ServiceWithEmployee } from 'src/shared/types/service.interface';
import { Service } from '../../../core/domain/entities/service';
import { ServiceRepository } from '../../../core/domain/repositories/service-repository';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IServiceFilters } from 'src/shared/types/filters.interface';

export class ServiceRepositoryInMemory implements ServiceRepository {
  public services: Service[] = [];

  async create(service: Service): Promise<void> {
    this.services.push(service);
  }

  async findById(companyInstance: CompanyInstance,id: string): Promise<Service | null> {
    const service = this.services.find((service) => service.id === id);

    if (!service) return null;

    return service;
  }

  async delete(id: string): Promise<void> {
    this.services = this.services.filter((service) => service.id !== id);
  }

  async save(service: Service): Promise<void> {
    const serviceIndex = this.services.findIndex(
      (currentService) => currentService.id == service.id,
    );

    if (serviceIndex > 0) this.services[serviceIndex] = service;
  }

  async findMany(
    companyInstance: CompanyInstance,
    page: number,
    perPage: number,
    filters: IServiceFilters
  ): Promise<IServiceWithCount> {
    throw new Error('Method not implemented.');
  }

  async findOne(companyInstance: CompanyInstance, serviceName: string): Promise<Service | null> {
    const job = this.services.find(
      (service) => service.serviceName === serviceName,
    );

    if (!job) return null;

    return job;
  }

  findByWorkOrder(companyInstance: CompanyInstance, workOrderId: string): Promise<[]> {
    throw new Error('Method not implemented.');
  }
}
