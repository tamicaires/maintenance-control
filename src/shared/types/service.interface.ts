import { EmployeeBasicInfo } from './employee.type';

export interface ServiceWithEmployee {
  id: string;
  serviceName: string;
  serviceCategory: string;
  employee: EmployeeBasicInfo[];
}
export interface IService {
  id: string;
  serviceName: string;
  serviceCategory: string;
  weight: number | null;
  companyId: string;
}

export interface IServiceWithCount {
  services: IService[];
  totalCount: number;
}