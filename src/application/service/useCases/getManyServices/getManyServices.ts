import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../../../../core/domain/repositories/service-repository';
import { ServiceCategory } from 'src/core/enum/service-category.enum';
import { IServiceFilters } from 'src/shared/types/filters.interface';
import { IUseCase } from 'src/shared/protocols/use-case';
import { CompanyInstance } from 'src/core/company/company-instance';

interface IRequest {
  page?: string;
  perPage?: string;
  serviceName?: string;
  serviceCategory?: ServiceCategory;
}

@Injectable()
export class GetManyServices implements IUseCase<IRequest, any> {
  constructor(private serviceRepository: ServiceRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(data.page) || DEFAULT_PAGE;
    const currentPerPage = Number(data.perPage) || DEFAULT_PERPAGE;

    const filters: IServiceFilters = {
      serviceName: data.serviceName ?? undefined,
      serviceCategory: data.serviceCategory ?? undefined,
    };

    const services = await this.serviceRepository.findMany(
      companyInstance,
      currentPage,
      currentPerPage,
      filters
    );

    return services;
  }
}
