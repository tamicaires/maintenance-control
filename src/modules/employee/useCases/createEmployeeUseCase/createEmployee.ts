import { Injectable } from "@nestjs/common";
import { EmployeeStatus } from "../../enum/employee-status.enum";
import { Employee } from "../../entities/Employee";
import { EmployeeRepository } from "../../repositories/EmployeeRepository";

interface CreateEmployeeRequest{
  name: string;
  jobId: string;
  workShift: string
  status: EmployeeStatus
}

@Injectable()
export class CreateEmployee {
  constructor(private employeeRepository: EmployeeRepository){}

  async execute({ jobId, name, workShift, status }: CreateEmployeeRequest){
    const employee = new Employee({
      name,
      workShift,
      jobId,
      status
    });

    await this.employeeRepository.create(employee);
    
    return employee;
  };
};