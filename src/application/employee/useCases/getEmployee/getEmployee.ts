import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../../../core/domain/repositories/employee-repository';
import { EmployeeNotFoundException } from '../../exceptions/EmployeeNotFoundException';

interface GetEmployeeRequest {
  employeeId: string;
}

@Injectable()
export class GetEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}
  async execute({ employeeId }: GetEmployeeRequest) {
    const employee = await this.employeeRepository.findById(employeeId);

    if (!employee) throw new EmployeeNotFoundException();

    return employee;
  }
}
