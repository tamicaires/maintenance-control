import { Injectable } from '@nestjs/common';
import { EmployeeNotFoundException } from '../../exceptions/EmployeeNotFoundException';
import { EmployeeRepository } from '../../repositories/EmployeeRepository';

interface DeleteEmployeeRequest {
  employeeId: string;
}

@Injectable()
export class DeleteEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({ employeeId }: DeleteEmployeeRequest) {
    const employee = await this.employeeRepository.findById(employeeId);

    if (!employee) throw new EmployeeNotFoundException();

    await this.employeeRepository.delete(employeeId);
  }
}
