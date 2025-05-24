import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../../../core/domain/repositories/fleet-repository';
import { IUseCase } from 'src/shared/protocols/use-case';
import { CompanyInstance } from 'src/core/company/company-instance';
import { FleetFilters } from 'src/shared/types/filters.interface';
import { IFleetWithCount } from 'src/presenters/fleet/viewModel/FleetViewModel';

interface IRequest {
  page?: string;
  perPage?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetManyFleets implements IUseCase<IRequest, IFleetWithCount> {
  constructor(private fleetRepository: FleetRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(data.page) || DEFAULT_PAGE;
    const currentPerPage = Number(data.perPage) || DEFAULT_PER_PAGE;

    const filters: FleetFilters = {
      isActive: data.isActive,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      endDate: data.endDate ? new Date(data.endDate) : undefined,
    };

    const fleets = await this.fleetRepository.findMany(
      companyInstance,
      currentPage,
      currentPerPage,
      filters
    );

    return fleets;
  }
}
