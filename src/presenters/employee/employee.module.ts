import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controler';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateEmployee } from 'src/application/employee/useCases/createEmployee/createEmployee';
import { DeleteEmployee } from 'src/application/employee/useCases/deleteEmployee/deleteEmployee';
import { EditEmployee } from 'src/application/employee/useCases/editEmployee/editEmployee';
import { GetEmployee } from 'src/application/employee/useCases/getEmployee/getEmployee';
import { GetEmployeeServices } from 'src/application/employee/useCases/getEmployeeServices/getEmployeeServices';
import { GetManyEmployees } from 'src/application/employee/useCases/getManyEmployees/getManyEmployees';


@Module({
  controllers: [EmployeeController],
  imports: [DatabaseModule],
  providers: [
    CreateEmployee,
    EditEmployee,
    DeleteEmployee,
    GetEmployee,
    GetEmployeeServices,
    GetManyEmployees,
  ],
})
export class EmployeeModule { }
