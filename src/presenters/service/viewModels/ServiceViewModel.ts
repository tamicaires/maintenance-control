import { Service } from "src/core/domain/entities/service";

export class ServiceViewModel {
  static toHttp({ id, serviceName, serviceCategory }: Service) {
    return {
      id,
      serviceName,
      serviceCategory,
    };
  }
}
