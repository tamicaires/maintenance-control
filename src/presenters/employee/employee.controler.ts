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

@Controller('employees')
export class EmployeeController {
  constructor(
    private createEmployee: CreateEmployee,
    private editEmployee: EditEmployee,
    private deleteEmployee: DeleteEmployee,
    private getEmployee: GetEmployee,
    private getEmployeeServices: GetEmployeeServices,
    private getManyEmployees: GetManyEmployees,
  ) {}

  @Post()
  async create(@Body() createEmployeeBody: CreateEmployeeBody) {
    return await this.createEmployee.execute(createEmployeeBody);
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

  @Delete()
  async delete(@Param() employeeId: string) {
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
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const employees = await this.getManyEmployees.execute({
      page,
      perPage,
    });

    return employees.map(EmployeeViewModel.toHttp);
  }
}
