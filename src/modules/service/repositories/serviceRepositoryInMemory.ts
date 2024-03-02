import { Service } from "../entities/Service";
import { ServiceRepository } from "./serviceRepository";

export class ServiceRepositoryInMemory implements ServiceRepository {
    
  public services: Service [] = []

  async create(service: Service): Promise<void> {
    this.services.push(service);
  };

  async findById(id: string): Promise<Service | null> {
    const service = this.services.find(service => service.id === id);

    if(!service) return null;

    return service;
  };

  async delete(id: string): Promise<void> {
    this.services = this.services.filter(service => service.id !== id);
  };

  async save(service: Service): Promise<void> {
    const serviceIndex = this.services.findIndex(currentService => currentService.id == service.id);

    if(serviceIndex > 0) this.services[serviceIndex] = service;
  };

  async findMany(filter: string, page: number, perPage: number): Promise<Service[]> {
    return this.services
      .filter(service => service.serviceName.includes(filter))
      .slice((page - 1) * perPage, page * perPage);
  };
};