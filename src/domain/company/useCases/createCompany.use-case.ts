import { Injectable } from '@nestjs/common';
import { Company } from '../entities/Company';
import { CompanyWithSameNameException } from '../exceptions/CompanyWithSameNameException';
import { CompanyRepository } from '../repositories/CompanyRepository';

interface CreateCompanyRequest {
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  address: string | null;
}

@Injectable()
export class CreateCompany {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(data: CreateCompanyRequest) {
    const companyAlreadyExist = await this.companyRepository.findOne(data.name);

    if (companyAlreadyExist) throw new CompanyWithSameNameException();

    const company = new Company(data);

    await this.companyRepository.create(company);

    return company;
  }
}
