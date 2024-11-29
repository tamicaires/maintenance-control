import { Module } from "@nestjs/common";
import { EmployeeServiceAssigmentController } from "./employee-service-assigment.controller";
import { DatabaseModule } from "src/infra/database/database.module";
import { AddServiceResponsible } from "src/application/employee-service-assigment/add-service-responsible";

@Module({
  controllers: [EmployeeServiceAssigmentController],
  imports: [DatabaseModule],
  providers: [
    AddServiceResponsible
  ]
})

export class EmployeeServiceAssigmentModule { }