import { Service } from "src/core/domain/entities/service";
import { IServiceWithCount } from "src/shared/types/service.interface";

export class ServiceViewModel {
  static toHttp({ id, serviceName, serviceCategory, companyId, weight }: Service) {
    return {
      id,
      serviceName,
      serviceCategory,
      companyId,
      weight
    };
  }

  static toHttpWithCount(data: IServiceWithCount): IServiceWithCount {
    const services = data.services.map(ServiceViewModel.toHttp);
    return {
      services: services,
      totalCount: data.totalCount,
    };
  }
}
