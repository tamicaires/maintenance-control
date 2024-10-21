import { Employee } from "src/domain/employee/entities/Employee";

export function updateEmployeeProperties(
  employee: Employee,
  data: Partial<Employee>,
) {
  if (data.name !== undefined) {
    employee.name = data.name;
  }

  if (data.workShift !== undefined) {
    employee.workShift = data.workShift;
  }

  if (data.jobTitleId !== undefined) {
    employee.jobTitleId = data.jobTitleId;
  }

  if (data.isActive !== undefined) {
    employee.isActive = data.isActive;
  }
}
