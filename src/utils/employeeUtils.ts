import { Employee } from "src/modules/employee/entities/Employee";

export function updateEmployeeProperties(employee: Employee, data: Partial<Employee>) {

  if(data.name !== undefined) {
    employee.name = data.name
  };
  
  if(data.workShift !== undefined) {
    employee.workShift = data.workShift
  };

  if(data.jobTitleId !== undefined) {
    employee.jobTitleId = data.jobTitleId 
  };

  if(data.status !== undefined) {
    employee.status = data.status
  };
  
};