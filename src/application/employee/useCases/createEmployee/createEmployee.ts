import { Injectable } from '@nestjs/common';
import { Employee, Employees } from '../../../../core/domain/entities/employee';
import { EmployeeRepository } from '../../../../core/domain/repositories/employee-repository';
import { EmployeeWithSameNameException } from '../../exceptions/EmployeeWithSameNameException';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IUseCase } from 'src/shared/protocols/use-case';

interface IRequest {
  name: string;
  jobTitleId: string;
  workShift: string;
  isActive: boolean;
}

@Injectable()
export class CreateEmployee implements IUseCase<IRequest, Employees> {
  constructor(private employeeRepository: EmployeeRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<Employees> {
    const employeeAlreadyExists = await this.employeeRepository.findOne(companyInstance, data.name);

    if (employeeAlreadyExists) throw new EmployeeWithSameNameException();

    const employee = new Employees(companyInstance.addCompanyFilter(data));

    return await this.employeeRepository.create(employee);
  }
}
