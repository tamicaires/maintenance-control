import { EmployeeBasicInfo } from './employee.type';

export interface ServiceWithEmployee {
  id: string;
  serviceName: string;
  serviceCategory: string;
  employee: EmployeeBasicInfo[];
}
