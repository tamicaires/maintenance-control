import { Injectable } from '@nestjs/common';
import { ServiceCategory } from '../../../../core/enum/service-category.enum';
import { ServiceNotFoundExcetion } from '../../exceptions/serviceNotFoundException';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';
import { CompanyInstance } from 'src/core/company/company-instance';

interface UpdateServiceRequest {
  serviceId: string;
  serviceName?: string;
  serviceCategory?: ServiceCategory;
}

@Injectable()
export class UpdateService {
  constructor(private serviceRepository: ServiceRepository) { }
  async execute(companyInstance: CompanyInstance, data: UpdateServiceRequest) {
    const service = await this.serviceRepository.findById(companyInstance, data.serviceId);

    if (!service) throw new ServiceNotFoundExcetion();

    if (data.serviceName !== undefined) service.serviceName = data.serviceName;

    if (data.serviceCategory !== undefined)
      service.serviceCategory = data.serviceCategory;

    await this.serviceRepository.save(service);

    return service;
  }
}
