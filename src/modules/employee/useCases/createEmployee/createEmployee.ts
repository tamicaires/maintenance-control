import { Injectable } from '@nestjs/common';
import { EmployeeStatus } from '../../enum/employee-status.enum';
import { Employee } from '../../entities/Employee';
import { EmployeeRepository } from '../../repositories/EmployeeRepository';
import { EmployeeWithSameNameException } from '../../exceptions/EmployeeWithSameNameException';

interface CreateEmployeeRequest {
  name: string;
  jobTitleId: string;
  workShift: string;
  status: EmployeeStatus;
}

@Injectable()
export class CreateEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    jobTitleId,
    name,
    workShift,
    status,
  }: CreateEmployeeRequest) {
    const employeeAlreadyExists = await this.employeeRepository.findOne(name);

    if (employeeAlreadyExists) throw new EmployeeWithSameNameException();

    const employee = new Employee({
      name,
      jobTitleId,
      workShift,
      status,
    });

    await this.employeeRepository.create(employee);

    return employee;
  }
}
