import { Injectable } from '@nestjs/common';
import { ServiceNotFoundExcetion } from '../../exceptions/serviceNotFoundException';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';

interface GetServiceRequest {
  serviceId: string;
}

@Injectable()
export class GetService {
  constructor(private serviceRepository: ServiceRepository) {}
  async execute({ serviceId }: GetServiceRequest) {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) throw new ServiceNotFoundExcetion();

    return service;
  }
}
