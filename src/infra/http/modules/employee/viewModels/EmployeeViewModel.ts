import { Employee } from "src/modules/employee/entities/Employee";

interface EmployeeWithRelationInfo extends Employee {
  job: { jobTitle: string }; 
}

export class EmployeeViewModel {
  static toHttp({ 
    id,
    name,
    workShift,
    jobTitleId,
    status,
    createdAt,
    updatedAt,
    job 
  }: EmployeeWithRelationInfo){
    const jobTitle = job?.jobTitle; 

    return {
      id,
      name,
      workShift,
      jobTitleId,
      jobTitle, 
      status,
      createdAt,
      updatedAt
    };
  };
};
