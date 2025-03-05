import { Employee as EmployeeRaw } from '@prisma/client';
import { Employee } from 'src/core/domain/entities/employee';
import { IEmployeeWithJobRaw } from 'src/shared/types/employee.type';


export class PrismaEmployeeMapper {
  static toPrisma({
    id,
    name,
    workShift,
    jobTitleId,
    isActive,
    companyId,
    createdAt,
    updatedAt,
  }: Employee): EmployeeRaw {
    return {
      id,
      name,
      workShift,
      jobTitleId,
      isActive,
      companyId,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    name,
    workShift,
    jobTitleId,
    isActive,
    companyId,
    createdAt,
    updatedAt,
  }: IEmployeeWithJobRaw) {
    return new Employee(
      {
        name,
        workShift,
        jobTitleId,
        isActive,
        companyId,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
