import { Injectable } from '@nestjs/common';
import { EmployeeNotFoundException } from '../../exceptions/EmployeeNotFoundException';
import { EmployeeRepository } from '../../../../core/domain/repositories/employee-repository';

interface GetEmployeeServicesRequest {
  employeeId: string;
}

@Injectable()
export class GetEmployeeServices {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({ employeeId }: GetEmployeeServicesRequest) {
    const employeeServices =
      await this.employeeRepository.getEmployeeServices(employeeId);

    if (!employeeServices) throw new EmployeeNotFoundException();

    return employeeServices;
  }
}
