import { Injectable } from '@nestjs/common';
import { EmployeeStatus } from '../../enum/employee-status.enum';
import { EmployeeRepository } from '../../repositories/EmployeeRepository';
import { EmployeeNotFoundException } from '../../exceptions/EmployeeNotFoundException';
import { updateEmployeeProperties } from 'src/utils/employeeUtils';

interface EditEmployeeRequest {
  employeeId: string;
  name?: string;
  jobTitleId?: string;
  workShift?: string;
  status?: EmployeeStatus;
}

@Injectable()
export class EditEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(data: EditEmployeeRequest) {
    const employee = await this.employeeRepository.findById(data.employeeId);

    if (!employee) throw new EmployeeNotFoundException();

    updateEmployeeProperties(employee, data);

    await this.employeeRepository.save(employee);

    return employee;
  }
}
