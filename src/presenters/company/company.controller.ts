import { Body, Controller, Get, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { CreateCompanyBody } from './dto/createCompanyBody';
import { CompanyViewModel } from './viewModel/companyViewModel';
import { PolicyGuard } from 'src/infra/http/auth/guards/policy.guard';
import { Permission } from 'src/infra/http/auth/decorators/permissions.decorator';
import { Action } from 'src/infra/http/ability/ability';
import { CreateCompany } from 'src/application/company/useCases/createCompany.use-case';
import { GetManyCompanies } from 'src/application/company/useCases/getManyCompanies.use-case';

@Controller('companies')
// @UseGuards(PolicyGuard)
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompany,
    private readonly getManyCompanies: GetManyCompanies,
  ) { }

  @Post()
  async createCompany(@Body() body: CreateCompanyBody) {
    const company = await this.createCompanyUseCase.execute(body);
    return CompanyViewModel.toHttp(company);
  }

  @Get()
  @Permission(Action.Read, 'Company')
  async getCompanies(@Request() req: any) {
    const companies = await this.getManyCompanies.execute({});
    return companies.map(company => CompanyViewModel.toHttp(company));
  }
}
