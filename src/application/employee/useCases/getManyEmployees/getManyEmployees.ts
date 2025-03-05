import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from '../../../../core/domain/repositories/employee-repository';
import { CompanyInstance } from 'src/core/company/company-instance';
import { IEmployeeFilters } from 'src/shared/types/filters.interface';
import { IUseCase } from 'src/shared/protocols/use-case';
import { IEmployeeWithCount } from 'src/shared/types/employee.type';

interface IRequest {
  page?: string;
  perPage?: string;
  isActive?: boolean;
  jobTitle?: string;
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetManyEmployees implements IUseCase<IRequest, IEmployeeWithCount> {
  constructor(private employeeRepository: EmployeeRepository) { }

  async execute(companyInstance: CompanyInstance, data: IRequest): Promise<IEmployeeWithCount> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(data.page) || DEFAULT_PAGE;
    const currentPerPage = Number(data.perPage) || DEFAULT_PERPAGE;

    const filters: IEmployeeFilters = {
      isActive: data.isActive,
      jobTitle: data.jobTitle,
      startDate: data.startDate,
      endDate: data.endDate
    }

    const employees = await this.employeeRepository.getMany(
      companyInstance,
      filters,
      currentPage,
      currentPerPage,
    );

    return employees;
  }
}
