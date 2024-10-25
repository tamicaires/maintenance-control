import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../../../core/domain/repositories/company-repository';

interface GetManyCompanyRequest {
  page?: string;
  perPage?: string;
}

@Injectable()
export class GetManyCompanies {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute({ page, perPage }: GetManyCompanyRequest) {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PER_PAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) | DEFAULT_PER_PAGE;

    const companies = await this.companyRepository.findMany(
      currentPage,
      currentPerPage,
    );

    return companies;
  }
}
