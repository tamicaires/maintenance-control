import { IEmployeeFilters } from 'src/shared/types/filters.interface';
import { Employee, Employees } from '../entities/employee';
import { CompanyInstance } from 'src/core/company/company-instance';

export abstract class EmployeeRepository {
  abstract create(employee: Employees): Promise<Employees>;
  abstract findById(id: string): Promise<Employee | null>;
  abstract save(employee: Employee): Promise<any>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(companyInstance: CompanyInstance, employeeName: string): Promise<Employees | null>;
  abstract getEmployeeServices(id: string): Promise<any>;
  abstract getMany(
    companyInstance: CompanyInstance,
    filters: IEmployeeFilters,
    page: number,
    perPage: number
  ): Promise<any>;
}
