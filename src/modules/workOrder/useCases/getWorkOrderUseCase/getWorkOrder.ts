import { Injectable } from "@nestjs/common";
import { WorkOrderRepository } from "../../repositories/workOrderRepository";
import { WorkOrderNotFoundException } from "../../exceptions/workOrderNotFoundException";

interface GetWorkOrderRequest {
  workOrderId: string;
};

@Injectable()
export class GetWorkOrder {
  constructor(private workOrderRepository: WorkOrderRepository){}

  async execute({ workOrderId }: GetWorkOrderRequest){
    const workOrder = await this.workOrderRepository.findById(workOrderId);

    if(!workOrder) throw new WorkOrderNotFoundException();

    return workOrder;
  };
};