import { Injectable } from '@nestjs/common';
import { Service } from '../../../../core/domain/entities/service';
import { ServiceCategory } from '../../../../core/enum/service-category.enum';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';
import { ServiceWithSameNameException } from '../../exceptions/serviceWithSameNameException';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IUseCase } from 'src/shared/protocols/use-case';

interface IRequest {
  serviceName: string;
  serviceCategory: ServiceCategory;
  weight: number;
}

@Injectable()
export class CreateService implements IUseCase<IRequest, Service> {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<Service> {
    const serviceAlreadyExist =
      await this.serviceRepository.findOne(companyInstance, data.serviceName);

    if (serviceAlreadyExist) throw new ServiceWithSameNameException();

    const service = new Service(companyInstance.addCompanyFilter(data));
    await this.serviceRepository.create(service);

    return service;
  }
}
