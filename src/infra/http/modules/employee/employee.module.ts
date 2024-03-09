import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controler";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateEmployee } from "src/modules/employee/useCases/createEmployee/createEmployee";
import { EditEmployee } from "src/modules/employee/useCases/editEmployee/editEmployee";
import { DeleteEmployee } from "src/modules/employee/useCases/deleteEmployee/deleteEmployee";
import { GetEmployee } from "src/modules/employee/useCases/getEmployee/getEmployee";
import { GetManyEmployees } from "src/modules/employee/useCases/getManyEmployees/getManyEmployees";
import { GetEmployeeServices } from "src/modules/employee/useCases/getEmployeeServices/getEmployeeServices";


@Module({
  controllers: [EmployeeController],
  imports: [DatabaseModule],
  providers: [
    CreateEmployee,
    EditEmployee,
    DeleteEmployee,
    GetEmployee,
    GetEmployeeServices,
    GetManyEmployees
  ]
})

export class EmployeeModule{}