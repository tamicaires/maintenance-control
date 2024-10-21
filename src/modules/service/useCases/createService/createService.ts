import { Injectable } from '@nestjs/common';
import { Service } from '../../entities/Service';
import { ServiceCategory } from '../../../../core/enum/service-category.enum';
import { ServiceRepository } from '../../repositories/serviceRepository';
import { ServiceWithSameNameException } from '../../exceptions/serviceWithSameNameException';

interface CreateServiceRequest {
  serviceName: string;
  serviceCategory: ServiceCategory;
}

@Injectable()
export class CreateService {
  constructor(private serviceRepository: ServiceRepository) {}
  async execute({ serviceName, serviceCategory }: CreateServiceRequest) {
    const serviceAlreadyExist =
      await this.serviceRepository.findOne(serviceName);

    if (serviceAlreadyExist) throw new ServiceWithSameNameException();
    const service = new Service({
      serviceName,
      serviceCategory,
    });

    await this.serviceRepository.create(service);

    return service;
  }
}
