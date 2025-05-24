import { Injectable } from '@nestjs/common';
import { CompanyInstance } from 'src/core/company/company-instance';
import { CarrierRepository } from 'src/core/domain/repositories/carrier-repository';
import { ICarrierWithCount } from 'src/presenters/carrier/viewModels/CarrierViewModel';
import { IUseCase } from 'src/shared/protocols/use-case';
import { CarrierFilters } from 'src/shared/types/filters.interface';

interface IRequest {
  isActive?: boolean;
  page?: string;
  perPage?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetManyCarriers implements IUseCase<IRequest, ICarrierWithCount> {
  constructor(private carrierRepository: CarrierRepository) { }

  async execute(companyInstance: CompanyInstance, request: IRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(request.page) || DEFAULT_PAGE;
    const currentPerPage = Number(request.perPage) || DEFAULT_PER_PAGE;

    const filters: CarrierFilters = {
      isActive: request.isActive,
      startDate: request.startDate ? new Date(request.startDate) : undefined,
      endDate: request.endDate ? new Date(request.endDate) : undefined,
    }

    const carriers = await this.carrierRepository.findMany(
      companyInstance,
      currentPage,
      currentPerPage,
      filters
    );

    return carriers;
  }
}
