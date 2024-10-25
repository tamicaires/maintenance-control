import { Injectable } from '@nestjs/common';
import { FleetRepository } from '../../../../core/domain/repositories/fleet-repository';

interface GetManyFleetsRequest {
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyFleets {
  constructor(private fleetRepository: FleetRepository) {}

  async execute({ page, perPage }: GetManyFleetsRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) | DEFAULT_PER_PAGE;

    const fleets = await this.fleetRepository.findMany(
      currentPage,
      currentPerPage,
    );

    return fleets;
  }
}
