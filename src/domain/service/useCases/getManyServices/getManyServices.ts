import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../../repositories/serviceRepository';

interface GetManyServicesRequest {
  filter?: string;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyServices {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({ filter, page, perPage }: GetManyServicesRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentFilter = filter ?? '';
    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PERPAGE;

    const services = await this.serviceRepository.findMany(
      currentFilter,
      currentPage,
      currentPerPage,
    );

    return services;
  }
}
