import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateEmployeeBody } from './dtos/createEmployeeBody';
import { EmployeeViewModel } from './viewModels/EmployeeViewModel';
import { EditEmployeeBody } from './dtos/editEmployeeBody';
import { CreateEmployee } from 'src/application/employee/useCases/createEmployee/createEmployee';
import { DeleteEmployee } from 'src/application/employee/useCases/deleteEmployee/deleteEmployee';
import { EditEmployee } from 'src/application/employee/useCases/editEmployee/editEmployee';
import { GetEmployee } from 'src/application/employee/useCases/getEmployee/getEmployee';
import { GetEmployeeServices } from 'src/application/employee/useCases/getEmployeeServices/getEmployeeServices';
import { GetManyEmployees } from 'src/application/employee/useCases/getManyEmployees/getManyEmployees';
import { Cookies } from 'src/infra/http/auth/decorators/cookies.decorator';
import { CookiesEnum } from 'src/core/enum/cookies';
import { CompanyInstance } from 'src/core/company/company-instance';

@Controller('employees')
export class EmployeeController {
  constructor(
    private createEmployee: CreateEmployee,
    private editEmployee: EditEmployee,
    private deleteEmployee: DeleteEmployee,
    private getEmployee: GetEmployee,
    private getEmployeeServices: GetEmployeeServices,
    private getManyEmployees: GetManyEmployees,
  ) { }

  @Post()
  async create(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Body() createEmployeeBody: CreateEmployeeBody
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    return await this.createEmployee.execute(companyInstance, createEmployeeBody);
  }

  @Put(':id')
  async edit(
    @Param('id') employeeId: string,
    @Body() editEmployeeBody: EditEmployeeBody,
  ) {
    const response = await this.editEmployee.execute({
      employeeId,
      ...editEmployeeBody,
    });

    return EmployeeViewModel.toHttp(response);
  }

  @Delete(':id')
  async delete(@Param('id') employeeId: string) {
    await this.deleteEmployee.execute({
      employeeId,
    });
  }

  @Get(':id')
  async getOne(@Param('id') employeeId: string) {
    const employee = await this.getEmployee.execute({
      employeeId,
    });

    return employee;
  }

  @Get('/services/:id')
  async getOneWithServices(@Param('id') employeeId: string) {
    const employeeServices = await this.getEmployeeServices.execute({
      employeeId,
    });

    return employeeServices;
  }

  @Get()
  async getMany(
    @Cookies(CookiesEnum.CompanyId) companyId: string,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('isActive') isActive: boolean,
    @Query('jobTitle') jobTitle: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const companyInstance = CompanyInstance.create(companyId);
    const queries = {
      page,
      perPage,
      isActive,
      jobTitle,
      startDate,
      endDate
    }

    return await this.getManyEmployees.execute(companyInstance, queries);
  }
}
