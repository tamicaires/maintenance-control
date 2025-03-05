import { CompanyInstance } from 'src/core/company/company-instance';
import { Employee, Employees } from '../../../core/domain/entities/employee';
import { EmployeeRepository } from '../../../core/domain/repositories/employee-repository';
import { IEmployeeFilters } from 'src/shared/types/filters.interface';

export class EmployeeRepositoryInMemory implements EmployeeRepository {
  public employees: Employee[] = [];
  public employees2: Employees[] = [];

  async create(employee: Employees): Promise<Employees> {
    // return this.employees2.push(employee);
    throw new Error("mehtod not implement")
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = await this.employees.find(
      (employee) => employee.id === id,
    );

    if (!employee) return null;

    return employee;
  }

  async save(employee: Employee): Promise<void> {
    const employeeIndex = await this.employees.findIndex((currenteEmployee) => {
      currenteEmployee.id === employee.id;
    });

    if (employeeIndex > 0) this.employees[employeeIndex] = employee;
  }

  async delete(id: string): Promise<void> {
    this.employees = this.employees.filter((employee) => employee.id !== id);
  }

  async getMany(companyInstance: CompanyInstance, filters: IEmployeeFilters, page: number, perPage: number): Promise<Employee[]> {
    return this.employees.slice((page - 1) * perPage, page * perPage);
  }

  async findOne(companyInstance: CompanyInstance, employeeName: string): Promise<Employees | null> {
    const employee = this.employees.find(
      (employee) => employee.name === employeeName,
    );

    if (!employee) return null;

    return employee;
  }

  async getEmployeeServices(id: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
