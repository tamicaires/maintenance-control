import { Injectable } from "@nestjs/common";
import { WorkOrderRepository } from "../../repositories/workOrderRepository";
import { WorkOrder } from "../../entities/WorkOrder";

interface GetWorkOrderServicesRequest {
  workOrderId: string;
};

@Injectable()
export class GetWorkOrderServices {
  constructor(private workOrderRepository: WorkOrderRepository){}

  async execute({ workOrderId }: GetWorkOrderServicesRequest){

    const workOrderServices = await this.workOrderRepository.getWorkOrderServices(workOrderId);

    const services: WorkOrder[] = [];

    workOrderServices.map(workOrder => {
      services.push(workOrder)
    }); 

    return services;
  };
};



