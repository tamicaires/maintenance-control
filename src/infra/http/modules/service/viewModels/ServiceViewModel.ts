import { Service } from "src/modules/service/entities/Service";

export class ServiceViewModel {
  static toHttp({ id, serviceName, serviceCategory }: Service){
    return {
      id,
      serviceName,
      serviceCategory
    };
  };
};