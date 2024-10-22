import { Injectable } from '@nestjs/common';
import { CarrierRepository } from '../../repositories/CarrierRepository';
import { CompanyInstance } from 'src/core/company/company-instance';

interface GetAllCarriersRequest {
  companyInstance: CompanyInstance;
  status?: string | null;
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyCarriers {
  constructor(private carrierRepository: CarrierRepository) { }

  async execute({ companyInstance, page, perPage }: GetAllCarriersRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE;

    const carriers = await this.carrierRepository.findMany(
      companyInstance,
      currentPage,
      currentPerPage,
    );

    return carriers;
  }
}
