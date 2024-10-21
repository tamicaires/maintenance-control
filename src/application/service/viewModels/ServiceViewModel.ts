
import { Service } from 'src/domain/service/entities/Service';

export class ServiceViewModel {
  static toHttp({ id, serviceName, serviceCategory }: Service) {
    return {
      id,
      serviceName,
      serviceCategory,
    };
  }
}
