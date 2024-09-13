import { Service } from 'src/modules/service/entities/Service';
import { EmployeeBasicInfo } from 'src/types/employee.type';

export class ServiceViewModel {
  static toHttp({ id, serviceName, serviceCategory }: Service) {
    return {
      id,
      serviceName,
      serviceCategory,
    };
  }
}
