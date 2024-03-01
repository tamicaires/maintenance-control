import { Employee } from "src/modules/employee/entities/Employee";

export class EmployeeViewModel {
  static toHttp({ 
    id,
    name,
    workShift,
    jobTitleId,
    status,
    createdAt,
    updatedAt
  }: Employee){
    return {
      id,
      name,
      workShift,
      jobTitleId,
      status,
      createdAt,
      updatedAt
    };
  };
};