import { Injectable } from '@nestjs/common';
import { Employee } from '../../../../core/domain/entities/employee';
import { EmployeeRepository } from '../../../../core/domain/repositories/employee-repository';
import { EmployeeWithSameNameException } from '../../exceptions/EmployeeWithSameNameException';

interface CreateEmployeeRequest {
  name: string;
  jobTitleId: string;
  workShift: string;
  isActive: boolean;
}

@Injectable()
export class CreateEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    jobTitleId,
    name,
    workShift,
    isActive,
  }: CreateEmployeeRequest) {
    const employeeAlreadyExists = await this.employeeRepository.findOne(name);

    if (employeeAlreadyExists) throw new EmployeeWithSameNameException();

    const employee = new Employee({
      name,
      jobTitleId,
      workShift,
      isActive,
    });

    await this.employeeRepository.create(employee);

    return employee;
  }
}
