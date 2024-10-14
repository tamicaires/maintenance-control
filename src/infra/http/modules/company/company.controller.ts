import { Body, Controller, Get, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { CreateCompanyBody } from './dto/createCompanyBody';
import { CreateCompany } from 'src/modules/company/useCases/createCompany.use-case';
import { GetManyCompanies } from 'src/modules/company/useCases/getManyCompanies.use-case';
import { Permission } from '../auth/decorators/permissions.decorator';
import { Action } from '../ability/ability';
import { PolicyGuard } from '../auth/guards/policy.guard';

@Controller('companies')
@UseGuards(PolicyGuard)
export class CompanyController {
  constructor(
    private readonly createCompanyUseCase: CreateCompany,
    private readonly getManyCompanies: GetManyCompanies,
  ) { }

  @Post()
  async createCompany(@Body() body: CreateCompanyBody) {
    const company = await this.createCompanyUseCase.execute(body);
    return company;
  }

  @Get()
  @Permission(Action.Read, 'Company')
  async getCompanies(@Request() req: any) {
    return await this.getManyCompanies.execute({});
  }
}
