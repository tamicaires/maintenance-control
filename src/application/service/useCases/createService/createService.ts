import { Injectable } from '@nestjs/common';
import { Service } from '../../../../core/domain/entities/service';
import { ServiceCategory } from '../../../../core/enum/service-category.enum';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';
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
