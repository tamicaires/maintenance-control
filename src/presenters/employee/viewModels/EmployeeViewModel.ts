import { Employee } from "src/core/domain/entities/employee";

interface EmployeeWithRelationInfo extends Employee {
  job: { jobTitle: string };
}

export class EmployeeViewModel {
  static toHttp({
    id,
    name,
    workShift,
    jobTitleId,
    isActive,
    createdAt,
    updatedAt,
    job,
  }: EmployeeWithRelationInfo) {
    const jobTitle = job?.jobTitle;

    return {
      id,
      name,
      workShift,
      jobTitleId,
      jobTitle,
      isActive,
      createdAt,
      updatedAt,
    };
  }
}
