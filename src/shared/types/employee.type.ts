interface Job {
  jobTitle: string;
}

export interface EmployeeWithJobInfo {
  id: string;
  name: string;
  workShift: string;
  isActive: boolean;
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
