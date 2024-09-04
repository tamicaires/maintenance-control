import { ServiceWithEmployee } from 'src/types/service.interface';
import { Service } from '../entities/Service';

export abstract class ServiceRepository {
  abstract create(service: Service): Promise<void>;
  abstract findById(id: string): Promise<Service | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(service: Service): Promise<void>;
  abstract findOne(serviceName: string): Promise<Service | null>;
  abstract findMany(
    filter: string,
    page: number,
    perPage: number,
  ): Promise<Service[]>;
  abstract findByWorkOrder(workOrderId: string): Promise<[]>;
}
