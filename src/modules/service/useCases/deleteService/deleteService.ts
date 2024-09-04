import { Injectable } from '@nestjs/common';
import { ServiceNotFoundExcetion } from '../../exceptions/serviceNotFoundException';
import { ServiceRepository } from '../../repositories/serviceRepository';

interface DeleteServiceRequest {
  serviceId: string;
}

@Injectable()
export class DeleteService {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({ serviceId }: DeleteServiceRequest) {
    const service = await this.serviceRepository.findById(serviceId);

    if (!service) throw new ServiceNotFoundExcetion();

    await this.serviceRepository.delete(serviceId);
  }
}
