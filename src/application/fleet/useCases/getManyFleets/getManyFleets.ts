import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../../../core/domain/repositories/fleet-repository';
import { IUseCase } from 'src/shared/protocols/use-case';
import { CompanyInstance } from 'src/core/company/company-instance';

interface IRequest {
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyFleets implements IUseCase<IRequest, any> {
  constructor(private fleetRepository: FleetRepository) { }

  async execute(companyInstance: CompanyInstance, { page, perPage }: IRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) | DEFAULT_PER_PAGE;

    const fleets = await this.fleetRepository.findMany(
      companyInstance,
      currentPage,
      currentPerPage,
    );

    return fleets;
  }
}
