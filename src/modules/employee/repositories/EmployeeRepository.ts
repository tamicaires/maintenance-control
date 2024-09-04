import { Employee } from '../entities/Employee';

export abstract class EmployeeRepository {
  abstract create(employee: Employee): Promise<void>;
  abstract findById(id: string): Promise<Employee | null>;
  abstract save(employee: Employee): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findOne(employeeName: string): Promise<Employee | null>;
  abstract getEmployeeServices(id: string): Promise<any>;
  abstract getMany(page: number, perPage: number): Promise<any>;
}
