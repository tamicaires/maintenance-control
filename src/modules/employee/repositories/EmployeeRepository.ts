import { Employee } from "../entities/Employee";

export abstract class EmployeeRepository {
  abstract create(employee: Employee): Promise<void>;
  abstract findById(id: string): Promise<Employee | null>;
  abstract save(employee: Employee): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract getMany(
    page: number,
    perPage: number
  ): Promise<Employee[]>
}; 