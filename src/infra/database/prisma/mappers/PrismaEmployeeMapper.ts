import { Employee as EmployeeRaw  } from "@prisma/client";
import { Employee } from "src/modules/employee/entities/Employee";
import { EmployeeStatus } from "src/modules/employee/enum/employee-status.enum";

export class PrismaEmployeeMapper {
  static toPrisma({
    id,
    name,
    workShift,
    jobTitleId,
    status,
    createdAt,
    updatedAt
  }: Employee): EmployeeRaw {
    return {
    id,
    name,
    workShift,
    jobTitleId,
    status,
    createdAt,
    updatedAt
    };
  };

  static toDomain({
    id,
    name,
    workShift,
    jobTitleId,
    status,
    createdAt,
    updatedAt
  }: EmployeeRaw): Employee{
    return new Employee({
      name,
      workShift,
      jobTitleId,
      status: status as EmployeeStatus,
      createdAt,
      updatedAt
    }, id);
  };
};