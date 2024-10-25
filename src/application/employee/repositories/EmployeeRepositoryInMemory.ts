import { Employee } from '../../../core/domain/entities/employee';
import { EmployeeRepository } from '../../../core/domain/repositories/employee-repository';

export class EmployeeRepositoryInMemory implements EmployeeRepository {
  public employees: Employee[] = [];

  async create(employee: Employee): Promise<void> {
    this.employees.push(employee);
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

  async getMany(page: number, perPage: number): Promise<Employee[]> {
    return this.employees.slice((page - 1) * perPage, page * perPage);
  }

  async findOne(employeeName: string): Promise<Employee | null> {
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
