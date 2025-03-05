import { Injectable } from '@nestjs/common';
import { ServiceNotFoundExcetion } from '../../exceptions/serviceNotFoundException';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';
import { IUseCase } from 'src/shared/protocols/use-case';
import { CompanyInstance } from 'src/core/company/company-instance';

@Injectable()
export class DeleteService implements IUseCase<string, void> {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute(companyInstance: CompanyInstance, serviceId: string): Promise<void> {
    const service = await this.serviceRepository.findById(companyInstance, serviceId);
    if (!service) throw new ServiceNotFoundExcetion();

    await this.serviceRepository.delete(serviceId);
  }
}
