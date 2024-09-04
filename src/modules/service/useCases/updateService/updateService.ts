import { Injectable } from '@nestjs/common';
import { ServiceCategory } from '../../enum/service-category.enum';
import { ServiceNotFoundExcetion } from '../../exceptions/serviceNotFoundException';
import { ServiceRepository } from '../../repositories/serviceRepository';

interface UpdateServiceRequest {
  serviceId: string;
  serviceName?: string;
  serviceCategory?: ServiceCategory;
}

@Injectable()
export class UpdateService {
  constructor(private serviceRepository: ServiceRepository) {}
  async execute({
    serviceId,
    serviceName,
    serviceCategory,
  }: UpdateServiceRequest) {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) throw new ServiceNotFoundExcetion();

    if (serviceName !== undefined) service.serviceName = serviceName;

    if (serviceCategory !== undefined)
      service.serviceCategory = serviceCategory;

    await this.serviceRepository.save(service);

    return service;
  }
}
