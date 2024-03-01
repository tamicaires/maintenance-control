import { Module } from "@nestjs/common";
import { EmployeeController } from "./employee.controler";
import { DatabaseModule } from "src/infra/database/database.module";
import { CreateEmployee } from "src/modules/employee/useCases/createEmployeeUseCase/createEmployee";
import { EditEmployee } from "src/modules/employee/useCases/editEmployeeUseCase.ts/editEmployee";
import { DeleteEmployee } from "src/modules/employee/useCases/deleteEmployeeUseCase/deleteEmployee";
import { GetEmployee } from "src/modules/employee/useCases/getEmployeeUseCase/getEmployee";
import { GetManyEmployees } from "src/modules/employee/useCases/getManyEmployeesUseCase/getManyEmployees";

@Module({
  controllers: [EmployeeController],
  imports: [DatabaseModule],
  providers: [
    CreateEmployee,
    EditEmployee,
    DeleteEmployee,
    GetEmployee,
    GetManyEmployees
  ]
})

export class EmployeeModule{}