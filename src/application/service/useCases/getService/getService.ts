import { Injectable } from '@nestjs/common';
import { ServiceNotFoundExcetion } from '../../exceptions/serviceNotFoundException';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';
import { IUseCase } from 'src/shared/protocols/use-case';
import { CompanyInstance } from 'src/core/company/company-instance';
import { Service } from 'src/core/domain/entities/service';

@Injectable()
export class GetService implements IUseCase<string, Service> {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute(companyInstance: CompanyInstance, serviceId: string): Promise<Service> {
    const service = await this.serviceRepository.findById(companyInstance, serviceId);

    if (!service) throw new ServiceNotFoundExcetion();

    return service;
  }
}
