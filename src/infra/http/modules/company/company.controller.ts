import { Body, Controller, Get, Injectable, Post } from '@nestjs/common';
import { CreateCompanyBody } from './dto/createCompanyBody';
import { CreateCompany } from 'src/modules/company/useCases/createCompany.use-case';
import { GetManyCompanies } from 'src/modules/company/useCases/getManyCompanies.use-case';

@Controller('companies')
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompany,
    private readonly getManyCompanies: GetManyCompanies,
  ) {}

  @Post()
  async createCompany(@Body() body: CreateCompanyBody) {
    const company = await this.createCompanyUseCase.execute(body);
    return company;
  }

  @Get()
  async getCompanies() {
    return await this.getManyCompanies.execute({});
  }
}
