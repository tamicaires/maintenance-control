import { Injectable } from "@nestjs/common";
import { WorkOrderRepository } from "../../repositories/workOrderRepository";
import { WorkOrderNotFoundException } from "../../exceptions/workOrderNotFoundException";


interface DeleteWorkOrderRequest{
  workOrderId: string;
};

@Injectable()
export class DeleteWorkOrder{
  constructor(private workOrderRepository: WorkOrderRepository){}

  async execute({ workOrderId }: DeleteWorkOrderRequest){
    const workOrder = await this.workOrderRepository.findById(workOrderId);

    if(!workOrder) throw new WorkOrderNotFoundException();

    await this.workOrderRepository.delete(workOrderId);
  };
};