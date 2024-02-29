import { Employee } from "src/modules/employee/entities/Employee";

export class EmployeeViewModel {
  static toHttp({ 
    id,
    name,
    workShift,
    jobId,
    status,
    createdAt,
    updatedAt
  }: Employee){
    return {
      id,
      name,
      workShift,
      jobId,
      status,
      createdAt,
      updatedAt
    };
  };
};