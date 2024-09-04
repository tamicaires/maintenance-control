import { EmployeeStatus } from 'src/modules/employee/enum/employee-status.enum';

interface Job {
  jobTitle: string;
}

export interface EmployeeWithJobInfo {
  id: string;
  name: string;
  workShift: string;
  status: EmployeeStatus;
  jobTitleId: string;
  createdAt: Date;
  updatedAt: Date;
  job: Job;
}

export interface EmployeeBasicInfo {
  id: string;
  name: string;
  jobTitle: string;
}
