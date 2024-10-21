import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../repositories/EmployeeRepository';
import { EmployeeNotFoundException } from '../../exceptions/EmployeeNotFoundException';
import { updateEmployeeProperties } from 'src/shared/utils/employeeUtils';

interface EditEmployeeRequest {
  employeeId: string;
  name?: string;
  jobTitleId?: string;
  workShift?: string;
  isActive?: boolean;
}

@Injectable()
export class EditEmployee {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute(data: EditEmployeeRequest) {
    const employee = await this.employeeRepository.findById(data.employeeId);

    if (!employee) throw new EmployeeNotFoundException();

    updateEmployeeProperties(employee, data);

    const updatedEmployee = await this.employeeRepository.save(employee);

    return updatedEmployee;
  }
}
