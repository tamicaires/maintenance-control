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

export interface IEmployeeWithJobRaw {
  id: string;
  name: string;
  workShift: string;
  isActive: boolean;
  jobTitleId: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  job: {
    jobTitle: string;
  };
}
export interface IEmployeeWithCount {
  employees: IEmployeeWithJobRaw[];
  totalCount: number;
}