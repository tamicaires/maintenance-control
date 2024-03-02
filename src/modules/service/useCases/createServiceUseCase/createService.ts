import { Injectable } from "@nestjs/common";
import { Service } from "../../entities/Service";
import { ServiceCategory } from "../../enum/service-category.enum";
import { ServiceRepository } from "../../repositories/serviceRepository";

interface CreateServiceRequest {
  serviceName: string;
  serviceCategory: ServiceCategory;
};

@Injectable()
export class CreateService {
  constructor(private serviceRepository: ServiceRepository){}
  async execute({ serviceName, serviceCategory }: CreateServiceRequest){
    const service = new Service({
      serviceName,
      serviceCategory
    });

    await this.serviceRepository.create(service);

    return service;
  };
};