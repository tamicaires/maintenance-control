import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";

interface GetManyEmployeesRequest {
  page?: string;
  perPage?: string;
};

@Injectable()
export class GetManyEmployees{
  constructor(private employeeRepository: EmployeeRepository){}
  async execute({ page, perPage }: GetManyEmployeesRequest){
    const DEFAULT_PAGE = 1;
    const DEFAULT_PERPAGE = 20;

    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentPerPage = Number(perPage) || DEFAULT_PERPAGE;

    const employees = await this.employeeRepository.getMany(
      currentPage, 
      currentPerPage
    );

    return employees;
  };
};